import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const AccessToken = () =>
  applyDecorators(
    UseGuards(AccessTokenGuard),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ description: 'Not authorized' }),
  );