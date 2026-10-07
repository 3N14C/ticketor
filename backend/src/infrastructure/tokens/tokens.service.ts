import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENTS } from '@common/config';
import { randomUUID } from 'crypto';
import { JwtPayload, VerifiedJwtPayload } from './types/jwt-payload.type';
import { TokensResponseDto } from './dto/res/tokens-response.dto';
import { JWT_ALGORITHM } from './jwt-algorithm';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const generatedJti = randomUUID();

    return await this.jwtService.signAsync(
      {
        ...payload,
        jti: generatedJti,
      },
      {
        secret: this.configService.getOrThrow<string>(ENVIRONMENTS.jwt.access.secret),
        algorithm: JWT_ALGORITHM,
        expiresIn: this.configService.getOrThrow<number>(ENVIRONMENTS.jwt.access.expiresIn),
      },
    );
  }

  async generateRefreshToken(payload: JwtPayload): Promise<string> {
    const generatedJti = randomUUID();

    return await this.jwtService.signAsync(
      {
        ...payload,
        jti: generatedJti,
      },
      {
        secret: this.configService.getOrThrow<string>(ENVIRONMENTS.jwt.refresh.secret),
        algorithm: JWT_ALGORITHM,
        expiresIn: this.configService.getOrThrow<number>(ENVIRONMENTS.jwt.refresh.expiresIn),
      },
    );
  }

  async generateTokens(payload: JwtPayload): Promise<TokensResponseDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyRefreshToken(token: string): Promise<VerifiedJwtPayload> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow<string>(ENVIRONMENTS.jwt.refresh.secret),
      algorithms: [JWT_ALGORITHM],
    });
  }
}
