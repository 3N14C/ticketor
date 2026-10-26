import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { VerifyAccessTokenHandler } from '../../application/queries/verify-access-token/verify-access-token.handler';
import { AuthCookiesService } from '../cookies/auth-cookies.service';
import { AuthenticatedRequest } from '../types/authenticated-request.type';
import { VerifyAccessTokenQuery } from '../../application/queries/verify-access-token/verify-access-token.query';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly verifyAccessTokenHandler: VerifyAccessTokenHandler,
    private readonly cookies: AuthCookiesService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    req.user = await this.verifyAccessTokenHandler.execute(
      new VerifyAccessTokenQuery(this.cookies.get(req, 'accessToken')),
    );

    return true;
  }
}