import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { ENVIRONMENTS } from '@core/configs';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(configService: ConfigService) {
    super(configService.getOrThrow<string>(ENVIRONMENTS.redis.url));
  }

  async onModuleDestroy() {
    await this.quit();
  }
}
