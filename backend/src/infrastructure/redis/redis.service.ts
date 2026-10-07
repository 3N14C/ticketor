import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { ENVIRONMENTS } from '@common/config';

const CONNECT_TIMEOUT_MS = 5000;
const COMMAND_TIMEOUT_MS = 2000;

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(configService: ConfigService) {
    super(configService.getOrThrow<string>(ENVIRONMENTS.redis.url), {
      connectTimeout: CONNECT_TIMEOUT_MS,
      // Без таймаута и лимита ретраев запросы висят, пока Redis недоступен
      commandTimeout: COMMAND_TIMEOUT_MS,
      maxRetriesPerRequest: 1,
    });

    this.on('error', (error: Error) => this.logger.error(`Redis error: ${error.message}`));
  }

  async onModuleDestroy() {
    await this.quit();
  }
}
