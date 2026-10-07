import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '@infrastructure/tokens/tokens.module';
import { CookieModule } from '@infrastructure/cookie/cookie.module';
import { AuthGuardsModule } from '@common/auth/auth-guards.module';
import { RedisModule } from '@infrastructure/redis/redis.module';

@Module({
  imports: [UsersModule, TokensModule, CookieModule, AuthGuardsModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
