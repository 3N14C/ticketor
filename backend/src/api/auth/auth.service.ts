import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@generated/prisma/client';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/req/sign-up.dto';
import { SignInDto } from './dto/req/sign-in.dto';
import argon2 from 'argon2';
import { TokensService } from '@infrastructure/tokens/tokens.service';
import { AuthResponseDto } from './dto/res/auth-response.dto';
import { UserResponseDto } from '../users/dto/res/user-response.dto';
import { JwtTokenPayloadResponse } from '@infrastructure/tokens/dto/res/jwt-token-response.dto';
import { TokenDenylistService } from '@infrastructure/redis/token-denylist.service';

const PRISMA_UNIQUE_CONSTRAINT_VIOLATION = 'P2002';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly tokenDenylistService: TokenDenylistService,
  ) {}

  async signUp(dto: SignUpDto): Promise<void> {
    try {
      await this.usersService.create(dto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PRISMA_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new BadRequestException('User already exists');
      }

      throw error;
    }
  }

  async signIn(dto: SignInDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new BadRequestException('Invalid credentials');

    const isCorrectPassword = await argon2.verify(user.password, dto.password);

    if (!isCorrectPassword) throw new BadRequestException('Invalid credentials');

    return await this.tokensService.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }

  async signOut(accessTokenPayload: JwtTokenPayloadResponse, refreshToken: string | undefined): Promise<void> {
    const ttlAccessToken = accessTokenPayload.exp - Math.floor(Date.now() / 1000);
    await this.tokenDenylistService.revoke(accessTokenPayload.jti, ttlAccessToken);

    if (!refreshToken) return;

    try {
      const refreshTokenPayload = await this.tokensService.verifyRefreshToken(refreshToken);
      const ttlRefreshToken = refreshTokenPayload.exp - Math.floor(Date.now() / 1000);

      await this.tokenDenylistService.revoke(refreshTokenPayload.jti, ttlRefreshToken);
    } catch {
      // refresh-токена нет
    }
  }

  async refreshTokens(refreshToken: string | undefined) {
    if (!refreshToken) throw new UnauthorizedException('Token is expired');

    const payload = await this.tokensService.verifyRefreshToken(refreshToken);

    await this.tokensService.generateTokens(payload);
  }

  async me(id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}