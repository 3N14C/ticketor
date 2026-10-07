import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/req/sign-up.dto';
import { MessageResponse } from '@common/types/message-response';
import { SignInDto } from './dto/req/sign-in.dto';
import type { Request, Response } from 'express';
import { CookieService } from '@infrastructure/cookie/cookie.service';
import { Throttle } from '@nestjs/throttler';
import { AccessToken } from '@common/auth/decorators/access-token.decorator';
import { TokenPayload } from '@common/auth/decorators/token-payload.decorator';
import { UserResponseDto } from '../users/dto/res/user-response.dto';
import type { VerifiedJwtPayload } from '@infrastructure/tokens/types/jwt-payload.type';
import { RefreshToken } from '@common/auth/decorators/refresh-token.decorator';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto, @Res({ passthrough: true }) res: Response): Promise<MessageResponse> {
    const tokens = await this.authService.signUp(dto);

    this.cookieService.setTokens(res, tokens);

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

    this.cookieService.setTokens(res, tokens);

    return {
      message: 'Authorized successfully',
    };
  }

  @Post('sign-out')
  @AccessToken()
  async signOut(
    @TokenPayload() accessTokenPayload: VerifiedJwtPayload,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = this.cookieService.getToken(req, 'refreshToken');

    await this.authService.signOut(accessTokenPayload, refreshToken);

    this.cookieService.deleteTokens(res);
  }

  @Post('refresh-tokens')
  @RefreshToken()
  async refreshTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<MessageResponse> {
    const refreshToken = this.cookieService.getToken(req, 'refreshToken');
    const tokens = await this.authService.refreshTokens(refreshToken);

    this.cookieService.setTokens(res, tokens);

    return {
      message: 'Refresh token successfully',
    };
  }

  @Get('me')
  @AccessToken()
  async me(@TokenPayload('sub') sub: string): Promise<UserResponseDto> {
    const user = await this.authService.me(sub);

    return new UserResponseDto(user);
  }
}
