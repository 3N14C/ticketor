import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigService } from '../config/app-config.service';

const CONNECT_TIMEOUT_MS = 5000;
const COMMAND_TIMEOUT_MS = 2000;

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(config: AppConfigService) {
    super(config.get('REDIS_URL'), {
      connectTimeout: CONNECT_TIMEOUT_MS,
      commandTimeout: COMMAND_TIMEOUT_MS,
      maxRetriesPerRequest: 1,
    });

    this.on('error', (error: Error) => {
      const cause = error instanceof AggregateError ? error.errors.map(String).join('; ') : error.message;
      this.logger.error(`Redis error: ${cause}`);
    });
  }

  async onModuleDestroy() {
    await this.quit();
  }
}