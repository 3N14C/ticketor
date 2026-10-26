import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { VerifiedTokenPayload } from '../../application/ports/tokens-service.port';
import { type AuthenticatedRequest } from '../types/authenticated-request.type';

export const TokenPayload = createParamDecorator(
  (key: keyof VerifiedTokenPayload | undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<AuthenticatedRequest>().user;

    return key ? user?.[key] : user;
  },
);