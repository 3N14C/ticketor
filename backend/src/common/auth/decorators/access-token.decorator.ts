import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../guards/access-token.guard';

export const AccessToken = () => applyDecorators(UseGuards(AccessTokenGuard));
