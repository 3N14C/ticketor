import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENTS } from '@core/configs';
import { TokenName } from './types/token-name.type';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  setToken(res: Response, tokenName: TokenName, value: string) {
    res.cookie(tokenName, value, {
      path: this.configService.getOrThrow<string>(ENVIRONMENTS.cookie.path),
      httpOnly: this.configService.getOrThrow<boolean>(
        ENVIRONMENTS.cookie.httpOnly,
      ),
      sameSite: this.configService.getOrThrow<CookieSameSite>(
        ENVIRONMENTS.cookie.sameSite,
      ),
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(
        Date.now() +
          Number(
            this.configService.getOrThrow<number>(
              tokenName === 'refreshToken'
                ? ENVIRONMENTS.jwt.refresh.expiresIn
                : ENVIRONMENTS.jwt.access.expiresIn,
            ),
          ) *
            1000,
      ),
    });
  }

  getToken(req: Request, tokenName: TokenName): string | undefined {
    return (req.cookies?.[tokenName] as string) || undefined;
  }

  deleteToken(res: Response, tokenName: TokenName) {
    res.clearCookie(tokenName, {
      path: this.configService.getOrThrow<string>(ENVIRONMENTS.cookie.path),
    });
  }
}