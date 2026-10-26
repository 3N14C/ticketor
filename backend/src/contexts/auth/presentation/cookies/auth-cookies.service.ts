import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@shared/infrastructure/config/app-config.service';
import type { CookieOptions, Request, Response } from 'express';
import { TokenPair } from '../../application/ports/tokens-service.port';

export type TokenName = 'accessToken' | 'refreshToken';

@Injectable()
export class AuthCookiesService {
  constructor(private readonly config: AppConfigService) {}

  set(res: Response, tokens: TokenPair): void {
    this.setOne(res, 'accessToken', tokens.accessToken);
    this.setOne(res, 'refreshToken', tokens.refreshToken);
  }

  clear(res: Response): void {
    res.clearCookie('accessToken', this.baseOptions('accessToken'));
    res.clearCookie('refreshToken', this.baseOptions('refreshToken'));
  }

  get(req: Request, name: TokenName): string | undefined {
    return (req.cookies?.[name] as string | undefined) || undefined;
  }

  private setOne(res: Response, name: TokenName, value: string): void {
    const expiresInSeconds = this.config.get(
      name === 'accessToken' ? 'JWT_ACCESS_EXPIRES_IN' : 'JWT_REFRESH_EXPIRES_IN',
    );

    res.cookie(name, value, {
      ...this.baseOptions(name),
      expires: new Date(Date.now() + expiresInSeconds * 1000),
    });
  }

  private baseOptions(name: TokenName): CookieOptions {
    return {
      path: this.config.get(name === 'refreshToken' ? 'COOKIE_REFRESH_PATH' : 'COOKIE_PATH'),
      httpOnly: true,
      sameSite: this.config.get('COOKIE_SAME_SITE'),
      secure: this.config.get('NODE_ENV') === 'production',
    };
  }
}