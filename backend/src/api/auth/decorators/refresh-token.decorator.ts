import { applyDecorators, UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';

export const RefreshToken = () => applyDecorators(UseGuards(RefreshTokenGuard));
