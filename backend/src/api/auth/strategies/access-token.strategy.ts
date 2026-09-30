import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ENVIRONMENTS } from '@core/configs';
import { Injectable } from '@nestjs/common';
import { JwtTokenPayloadResponseDto } from '@infrastructure/tokens/dto/res/jwt-token-response.dto';
import { TokenDenylistService } from '@infrastructure/redis/token-denylist.service';
import { extractTokenFromCookie } from './utils/extract-token-from-cookie';
import { assertTokenNotRevoked } from './utils/assert-token-not-revoked';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenDenylistService: TokenDenylistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookie('accessToken')]),
      secretOrKey: configService.getOrThrow<string>(ENVIRONMENTS.jwt.access.secret),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtTokenPayloadResponseDto): Promise<JwtTokenPayloadResponseDto> {
    await assertTokenNotRevoked(this.tokenDenylistService, payload.jti);

    return payload;
  }
}
