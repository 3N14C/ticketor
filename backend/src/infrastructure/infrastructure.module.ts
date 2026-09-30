import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CookieModule } from './cookie/cookie.module';
import { ObserveModule } from './observe/observe';
import { ENVIRONMENTS } from '@core/configs';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { RedisModule } from './redis/redis.module';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CookieModule,
    ObserveModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        appKey: configService.getOrThrow<string>(ENVIRONMENTS.observe.appKey),
        appSecret: configService.getOrThrow<string>(
          ENVIRONMENTS.observe.appSecret,
        ),
        serviceId: configService.getOrThrow<string>(
          ENVIRONMENTS.observe.serviceId,
        ),
        runtimeMetrics: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      useFactory: (configService: ConfigService, redisService: RedisService) => ({
        throttlers: [
          {
            ttl: Number(
              configService.getOrThrow<string>(ENVIRONMENTS.throttle.ttl),
            ),
            limit: Number(
              configService.getOrThrow<string>(ENVIRONMENTS.throttle.limit),
            ),
          },
        ],
        storage: new ThrottlerStorageRedisService(redisService),
      }),
      inject: [ConfigService, RedisService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class InfrastructureModule {}