import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { JwtTokenPayloadResponseDto } from '@infrastructure/tokens/dto/res/jwt-token-response.dto';

export const TokenPayload = createParamDecorator((data: keyof JwtTokenPayloadResponseDto, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const user = req.user as JwtTokenPayloadResponseDto;

  return data ? user[data] : user;
});
