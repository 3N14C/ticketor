import { ConfigService } from '@nestjs/config';
import { ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt';
import { TokenName } from '@infrastructure/cookie/types/token-name.type';
import { JWT_ALGORITHM } from '@infrastructure/tokens/jwt-algorithm';
import { extractTokenFromCookie } from './extract-token-from-cookie';

export const buildJwtCookieOptions = (
  configService: ConfigService,
  tokenName: TokenName,
  secretEnvKey: string,
): StrategyOptionsWithoutRequest => ({
  jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookie(tokenName)]),
  secretOrKey: configService.getOrThrow<string>(secretEnvKey),
  ignoreExpiration: false,
  algorithms: [JWT_ALGORITHM],
});
