import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@shared/infrastructure/config/app-config.service';
import {
  TokenPair,
  TokenPayload,
  TokensServicePort,
  VerifiedTokenPayload,
} from '../../../application/ports/tokens-service.port';
import { randomUUID } from 'crypto';
import { InvalidTokenError } from '../../../domain/errors/invalid-token.error';

const JWT_ALGORITHM = 'HS256' as const;

type TokenKind = 'access' | 'refresh';

@Injectable()
export class JwtTokensServiceAdapter implements TokensServicePort {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  async issuePair(payload: TokenPayload): Promise<TokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.sign(payload, 'access'),
      this.sign(payload, 'refresh'),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyAccess(token: string): Promise<VerifiedTokenPayload> {
    return this.verify(token, 'access');
  }

  verifyRefresh(token: string): Promise<VerifiedTokenPayload> {
    return this.verify(token, 'refresh');
  }

  private sign(payload: TokenPayload, kind: TokenKind): Promise<string> {
    return this.jwt.signAsync(
      { ...payload, jti: randomUUID() },
      { secret: this.secret(kind), algorithm: JWT_ALGORITHM, expiresIn: this.expiresIn(kind) },
    );
  }

  private async verify(token: string, kind: TokenKind): Promise<VerifiedTokenPayload> {
    try {
      return await this.jwt.verifyAsync<VerifiedTokenPayload>(token, {
        secret: this.secret(kind),
        algorithms: [JWT_ALGORITHM],
      });
    } catch {
      throw new InvalidTokenError();
    }
  }

  private secret(kind: TokenKind): string {
    return this.configService.get(kind === 'access' ? 'JWT_ACCESS_SECRET' : 'JWT_REFRESH_SECRET');
  }

  private expiresIn(kind: TokenKind): number {
    return this.configService.get(kind === 'access' ? 'JWT_ACCESS_EXPIRES_IN' : 'JWT_REFRESH_EXPIRES_IN');
  }
}