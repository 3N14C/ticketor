import { Injectable } from '@nestjs/common';
import type { CookieOptions, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENTS } from '@common/config';
import { TokenName } from './types/token-name.type';
import { TokensResponseDto } from '@infrastructure/tokens/dto/res/tokens-response.dto';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  setTokens(res: Response, tokens: TokensResponseDto) {
    this.setToken(res, 'accessToken', tokens.accessToken);
    this.setToken(res, 'refreshToken', tokens.refreshToken);
  }

  deleteTokens(res: Response) {
    this.deleteToken(res, 'accessToken');
    this.deleteToken(res, 'refreshToken');
  }

  getToken(req: Request, tokenName: TokenName): string | undefined {
    return (req.cookies?.[tokenName] as string) || undefined;
  }

  private setToken(res: Response, tokenName: TokenName, value: string) {
    const expiresInSeconds = this.configService.getOrThrow<number>(
      tokenName === 'refreshToken' ? ENVIRONMENTS.jwt.refresh.expiresIn : ENVIRONMENTS.jwt.access.expiresIn,
    );

    res.cookie(tokenName, value, {
      ...this.getBaseOptions(tokenName),
      expires: new Date(Date.now() + expiresInSeconds * 1000),
    });
  }

  private deleteToken(res: Response, tokenName: TokenName) {
    res.clearCookie(tokenName, this.getBaseOptions(tokenName));
  }

  private getBaseOptions(tokenName: TokenName): CookieOptions {
    return {
      path: this.configService.getOrThrow<string>(
        tokenName === 'refreshToken' ? ENVIRONMENTS.cookie.refreshPath : ENVIRONMENTS.cookie.path,
      ),
      httpOnly: true,
      sameSite: this.configService.getOrThrow<CookieOptions['sameSite']>(ENVIRONMENTS.cookie.sameSite),
      secure: this.configService.get<string>(ENVIRONMENTS.nodeEnv) === 'production',
    };
  }
}
