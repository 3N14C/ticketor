import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@generated/prisma/client';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/req/sign-up.dto';
import { SignInDto } from './dto/req/sign-in.dto';
import argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { TokensService } from '@infrastructure/tokens/tokens.service';
import { TokensResponseDto } from '@infrastructure/tokens/dto/res/tokens-response.dto';
import { UserResponseDto } from '../users/dto/res/user-response.dto';
import type { VerifiedJwtPayload } from '@infrastructure/tokens/types/jwt-payload.type';
import { TokenDenylistService } from '@infrastructure/redis/token-denylist.service';

const PRISMA_UNIQUE_CONSTRAINT_VIOLATION = 'P2002';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly tokenDenylistService: TokenDenylistService,
  ) {}

  private dummyHash?: Promise<string>;

  private getDummyHash(): Promise<string> {
    return (this.dummyHash ??= argon2.hash(randomUUID()));
  }

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
    const user = await this.usersService.findCredentialsByEmail(dto.email);

    const isCorrectPassword = await argon2.verify(user?.password ?? (await this.getDummyHash()), dto.password);

    if (!user || !isCorrectPassword) throw new UnauthorizedException('Invalid credentials');

    return await this.tokensService.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }

  async signOut(accessTokenPayload: VerifiedJwtPayload, refreshToken: string | undefined): Promise<void> {
    await this.tokenDenylistService.revoke(accessTokenPayload.jti, accessTokenPayload.exp);

    if (!refreshToken) return;

    let refreshTokenPayload: VerifiedJwtPayload;

    try {
      refreshTokenPayload = await this.tokensService.verifyRefreshToken(refreshToken);
    } catch {
      return;
    }

    await this.tokenDenylistService.revoke(refreshTokenPayload.jti, refreshTokenPayload.exp);
  }

  async refreshTokens(refreshToken: string | undefined): Promise<TokensResponseDto> {
    if (!refreshToken) throw new UnauthorizedException('Token is expired');

    const refreshTokenPayload = await this.tokensService.verifyRefreshToken(refreshToken);

    const isClaimed = await this.tokenDenylistService.revokeOnce(refreshTokenPayload.jti, refreshTokenPayload.exp);

    if (!isClaimed) throw new UnauthorizedException('Token revoked');

    const user = await this.usersService.findById(refreshTokenPayload.sub);

    if (!user) throw new UnauthorizedException('User not found');

    return await this.tokensService.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }

  async me(id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }
}
