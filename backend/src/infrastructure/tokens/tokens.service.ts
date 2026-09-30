import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENTS } from '@core/configs';
import { randomUUID } from 'crypto';
import { JwtTokenPayloadDto } from './dto/req/jwt-token-payload.dto';
import { JwtTokenPayloadResponseDto } from './dto/res/jwt-token-response.dto';
import { TokensResponseDto } from './dto/res/tokens-response.dto';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(payload: JwtTokenPayloadDto): Promise<string> {
    const generatedJti = randomUUID();

    return await this.jwtService.signAsync(
      {
        ...payload,
        jti: generatedJti,
      },
      {
        secret: this.configService.getOrThrow<string>(ENVIRONMENTS.jwt.access.secret),
        expiresIn: Number(this.configService.getOrThrow<number>(ENVIRONMENTS.jwt.access.expiresIn)),
      },
    );
  }

  async generateRefreshToken(payload: JwtTokenPayloadDto): Promise<string> {
    const generatedJti = randomUUID();

    return await this.jwtService.signAsync(
      {
        ...payload,
        jti: generatedJti,
      },
      {
        secret: this.configService.getOrThrow<string>(ENVIRONMENTS.jwt.refresh.secret),
        expiresIn: Number(this.configService.getOrThrow<number>(ENVIRONMENTS.jwt.refresh.expiresIn)),
      },
    );
  }

  async generateTokens(payload: JwtTokenPayloadDto): Promise<TokensResponseDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token: string): Promise<JwtTokenPayloadResponseDto> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow<string>(ENVIRONMENTS.jwt.access.secret),
    });
  }

  async verifyRefreshToken(token: string): Promise<JwtTokenPayloadResponseDto> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow<string>(ENVIRONMENTS.jwt.refresh.secret),
    });
  }
}