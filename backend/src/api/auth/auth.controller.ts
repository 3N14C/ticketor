import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { SignUpDto } from './dto/req/sign-up.dto';
import { MessageResponse } from '@core/types/message-response';
import { SignInDto } from './dto/req/sign-in.dto';
import type { Request, Response } from 'express';
import { CookieService } from '@infrastructure/cookie/cookie.service';
import { Throttle } from '@nestjs/throttler';
import { AccessToken } from '@core/decorators/access-token.decorator';
import { TokenPayload } from '@core/decorators/me.decorator';
import { UserResponseDto } from '../users/dto/res/user-response.dto';
import { JwtTokenPayloadResponse } from '@infrastructure/tokens/dto/res/jwt-token-response.dto';
import { RefreshToken } from '@core/decorators/refresh-token.decorator';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<MessageResponse> {
    await this.authService.signUp(dto);

    return {
      message: 'Authorized successfully',
    };
  }

  @Post('sign-in')
  @Throttle({
    default: { limit: 5, ttl: 60000, blockDuration: 15 * 60 * 1000 },
  })
  async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response): Promise<MessageResponse> {
    const tokens = await this.authService.signIn(dto);

    this.cookieService.setToken(res, 'accessToken', tokens.accessToken);
    this.cookieService.setToken(res, 'refreshToken', tokens.refreshToken);

    return {
      message: 'Authorized successfully',
    };
  }

  @Post('sign-out')
  @AccessToken()
  async signOut(
    @TokenPayload() accessTokenPayload: JwtTokenPayloadResponse,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = this.cookieService.getToken(req, 'refreshToken');

    await this.authService.signOut(accessTokenPayload, refreshToken);

    this.cookieService.deleteToken(res, 'accessToken');
    this.cookieService.deleteToken(res, 'refreshToken');
  }

  @Post('refresh-tokens')
  @RefreshToken()
  async refreshTokens(@Req() req: Request) {
    const refreshToken = this.cookieService.getToken(req, 'refreshToken');
    await this.authService.refreshTokens(refreshToken);
  }

  @Get('me')
  @AccessToken()
  async me(@TokenPayload('sub') sub: string) {
    const user = await this.authService.me(sub);

    return new UserResponseDto(user);
  }
}