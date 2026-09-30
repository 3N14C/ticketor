import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ENVIRONMENTS } from '../configs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { type Request } from 'express';
import { JwtTokenPayloadResponse } from '@infrastructure/tokens/dto/res/jwt-token-response.dto';
import { TokenDenylistService } from '@infrastructure/redis/token-denylist.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenDenylistService: TokenDenylistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => (req.cookies?.['accessToken'] as string) ?? null]),
      secretOrKey: configService.getOrThrow<string>(ENVIRONMENTS.jwt.access.secret),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtTokenPayloadResponse): Promise<JwtTokenPayloadResponse> {
    const isTokenRevoked = await this.tokenDenylistService.isRevoked(payload.jti);

    if (isTokenRevoked) throw new UnauthorizedException('Token revoked');

    return payload;
  }
}