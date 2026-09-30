import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '@infrastructure/tokens/tokens.module';
import { PassportModule } from '@nestjs/passport';
import { CookieModule } from '@infrastructure/cookie/cookie.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RedisModule } from '@infrastructure/redis/redis.module';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [UsersModule, TokensModule, CookieModule, PassportModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}