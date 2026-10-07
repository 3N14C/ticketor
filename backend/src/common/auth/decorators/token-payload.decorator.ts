import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { VerifiedJwtPayload } from '@infrastructure/tokens/types/jwt-payload.type';

export const TokenPayload = createParamDecorator((data: keyof VerifiedJwtPayload, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const user = req.user as VerifiedJwtPayload;

  return data ? user[data] : user;
});
