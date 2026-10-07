import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ENVIRONMENTS } from '@common/config';
import { TokenDenylistService } from '@infrastructure/redis/token-denylist.service';
import { VerifiedJwtPayload } from '@infrastructure/tokens/types/jwt-payload.type';
import { assertTokenNotRevoked } from './utils/assert-token-not-revoked';
import { buildJwtCookieOptions } from './utils/build-jwt-cookie-options';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(
    configService: ConfigService,
    private readonly tokenDenylistService: TokenDenylistService,
  ) {
    super(buildJwtCookieOptions(configService, 'accessToken', ENVIRONMENTS.jwt.access.secret));
  }

  async validate(payload: VerifiedJwtPayload): Promise<VerifiedJwtPayload> {
    await assertTokenNotRevoked(this.tokenDenylistService, payload.jti);

    return payload;
  }
}
