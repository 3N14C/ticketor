import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@generated/prisma/client';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/req/sign-up.dto';
import { SignInDto } from './dto/req/sign-in.dto';
import argon2 from 'argon2';
import { TokensService } from '@infrastructure/tokens/tokens.service';
import { TokensResponseDto } from '@infrastructure/tokens/dto/res/tokens-response.dto';
import { UserResponseDto } from '../users/dto/res/user-response.dto';
import { JwtTokenPayloadResponseDto } from '@infrastructure/tokens/dto/res/jwt-token-response.dto';
import { TokenDenylistService } from '@infrastructure/redis/token-denylist.service';

const PRISMA_UNIQUE_CONSTRAINT_VIOLATION = 'P2002';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly tokenDenylistService: TokenDenylistService,
  ) {}

  async signUp(dto: SignUpDto): Promise<TokensResponseDto> {
    try {
      const user = await this.usersService.create(dto);
      return await this.tokensService.generateTokens({
        sub: user.id,
        email: user.email,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PRISMA_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new BadRequestException('User already exists');
      }

      throw error;
    }
  }

  async signIn(dto: SignInDto): Promise<TokensResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new BadRequestException('Invalid credentials');

    const isCorrectPassword = await argon2.verify(user.password, dto.password);

    if (!isCorrectPassword) throw new BadRequestException('Invalid credentials');

    return await this.tokensService.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }

  async signOut(accessTokenPayload: JwtTokenPayloadResponseDto, refreshToken: string | undefined): Promise<void> {
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

  async refreshTokens(refreshToken: string | undefined): Promise<TokensResponseDto> {
    if (!refreshToken) throw new UnauthorizedException('Token is expired');

    const refreshTokenPayload = await this.tokensService.verifyRefreshToken(refreshToken);

    const ttlSeconds = refreshTokenPayload.exp - Math.floor(Date.now() / 1000);

    await this.tokenDenylistService.revoke(refreshTokenPayload.jti, ttlSeconds);

    return await this.tokensService.generateTokens({
      sub: refreshTokenPayload.sub,
      email: refreshTokenPayload.email,
    });
  }

  async me(id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}