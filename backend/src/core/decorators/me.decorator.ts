import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { JwtTokenPayloadResponse } from '@infrastructure/tokens/dto/res/jwt-token-response.dto';

export const TokenPayload = createParamDecorator((data: keyof JwtTokenPayloadResponse, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const user = req.user as JwtTokenPayloadResponse;

  return data ? user[data] : user;
});