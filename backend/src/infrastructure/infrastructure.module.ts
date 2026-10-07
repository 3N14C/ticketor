import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObserveModule } from './observe/observe';
import { ENVIRONMENTS } from '@common/config';
import { validateEnv } from '@common/config/env.validation';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { RedisModule } from './redis/redis.module';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    ObserveModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        appKey: configService.getOrThrow<string>(ENVIRONMENTS.observe.appKey),
        appSecret: configService.getOrThrow<string>(ENVIRONMENTS.observe.appSecret),
        serviceId: configService.getOrThrow<string>(ENVIRONMENTS.observe.serviceId),
        runtimeMetrics: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      useFactory: (configService: ConfigService, redisService: RedisService) => ({
        throttlers: [
          {
            ttl: configService.getOrThrow<number>(ENVIRONMENTS.throttle.ttl),
            limit: configService.getOrThrow<number>(ENVIRONMENTS.throttle.limit),
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
