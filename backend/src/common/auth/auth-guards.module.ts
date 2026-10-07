import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from '@infrastructure/redis/redis.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

/**
 * Регистрирует passport-стратегии, на которые опираются @AccessToken() и @RefreshToken().
 * Любой модуль, использующий эти декораторы, должен импортировать AuthGuardsModule.
 */
@Module({
  imports: [PassportModule, RedisModule],
  providers: [AccessTokenStrategy, RefreshTokenStrategy],
  exports: [PassportModule],
})
export class AuthGuardsModule {}
