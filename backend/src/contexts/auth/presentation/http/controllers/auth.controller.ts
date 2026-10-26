import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { SignUpHandler } from '../../../application/commands/sign-up/sign-up.handler';
import { SignInHandler } from '../../../application/commands/sign-in/sign-in.handler';
import { SignOutHandler } from '../../../application/commands/sign-out/sign-out.handler';
import { RefreshTokensHandler } from '../../../application/commands/refresh-tokens/refresh-tokens.handler';
import { CurrentUserHandler } from '../../../application/queries/current-user/current-user.handler';
import { AuthCookiesService } from '../../cookies/auth-cookies.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  MessageResponse,
  MessageResponseSchema,
  toMessageResponse,
} from '@shared/presentation/http/dto/message-response.dto';
import { type SignUpRequest, SignUpRequestSchema } from '../dto/request/sign-up-request.dto';
import { SignUpCommand } from '../../../application/commands/sign-up/sign-up.command';
import type { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { SignInCommand } from '../../../application/commands/sign-in/sign-in.command';
import { type SignInRequest, SignInRequestSchema } from '../dto/request/sign-in-request.dto';
import { AccessToken } from '../../decorators/access-token.decorator';
import { SignOutCommand } from '../../../application/commands/sign-out/sign-out.command';
import { TokenPayload } from '../../decorators/token-payload.decorator';
import { type VerifiedTokenPayload } from '../../../application/ports/tokens-service.port';
import { RefreshTokensCommand } from '../../../application/commands/refresh-tokens/refresh-tokens.command';
import {
  type AuthUserResponse,
  AuthUserResponseSchema,
  toAuthUserResponse,
} from '../dto/response/auth-user-response.dto';
import { CurrentUserQuery } from '../../../application/queries/current-user/current-user.query';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly signUpHandler: SignUpHandler,
    private readonly signInHandler: SignInHandler,
    private readonly signOutHandler: SignOutHandler,
    private readonly refreshTokenHandler: RefreshTokensHandler,
    private readonly currentUserHandler: CurrentUserHandler,
    private readonly cookies: AuthCookiesService,
  ) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up and sign in' })
  @ApiCreatedResponse({ description: 'Tokens are set in cookies', standardSchema: MessageResponseSchema })
  @ApiConflictResponse({ description: 'User already exists' })
  async signUp(
    @Body({ schema: SignUpRequestSchema }) dto: SignUpRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<MessageResponse> {
    const tokens = await this.signUpHandler.execute(new SignUpCommand(dto.name, dto.email, dto.password));

    this.cookies.set(res, tokens);

    return toMessageResponse('Authorized successfully');
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60_000, blockDuration: 15 * 60 * 1_000 } })
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({ description: 'Tokens are set in cookies', standardSchema: MessageResponseSchema })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async signIn(
    @Body({ schema: SignInRequestSchema }) dto: SignInRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<MessageResponse> {
    const tokens = await this.signInHandler.execute(new SignInCommand(dto.email, dto.password));

    this.cookies.set(res, tokens);

    return toMessageResponse('Authorized successfully');
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AccessToken()
  @ApiOperation({ summary: 'Sign out' })
  @ApiNoContentResponse({ description: 'Tokens are revoked and cookies are cleared' })
  async signOut(
    @TokenPayload() accessToken: VerifiedTokenPayload,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.signOutHandler.execute(new SignOutCommand(accessToken, this.cookies.get(req, 'refreshToken')));

    this.cookies.clear(res);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Issue a new pair of tokens by refresh token' })
  @ApiOkResponse({ description: 'New tokens are set in cookies', standardSchema: MessageResponseSchema })
  @ApiUnauthorizedResponse({ description: 'Refresh token is invalid, expired or already used' })
  async refreshTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<MessageResponse> {
    const tokens = await this.refreshTokenHandler.execute(
      new RefreshTokensCommand(this.cookies.get(req, 'refreshToken')),
    );

    this.cookies.set(res, tokens);

    return toMessageResponse('Tokens refreshed successfully');
  }

  @Get('me')
  @AccessToken()
  @ApiOperation({ summary: 'Current user' })
  @ApiOkResponse({ description: 'Current user', standardSchema: AuthUserResponseSchema })
  async me(@TokenPayload('sub') userId: string): Promise<AuthUserResponse> {
    const user = await this.currentUserHandler.execute(new CurrentUserQuery(userId));

    return toAuthUserResponse(user);
  }
}