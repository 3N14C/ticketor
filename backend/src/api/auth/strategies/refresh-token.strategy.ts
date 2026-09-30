import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENTS } from '@core/configs';
import { JwtTokenPayloadResponseDto } from '@infrastructure/tokens/dto/res/jwt-token-response.dto';
import { TokenDenylistService } from '@infrastructure/redis/token-denylist.service';
import { extractTokenFromCookie } from './utils/extract-token-from-cookie';
import { assertTokenNotRevoked } from './utils/assert-token-not-revoked';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenDenylistService: TokenDenylistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookie('refreshToken')]),
      secretOrKey: configService.getOrThrow<string>(ENVIRONMENTS.jwt.refresh.secret),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtTokenPayloadResponseDto): Promise<JwtTokenPayloadResponseDto> {
    await assertTokenNotRevoked(this.tokenDenylistService, payload.jti);

    return payload;
  }
}
