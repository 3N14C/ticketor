import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { AppConfigService } from '../config/app-config.service';

type PrismaOptions = Prisma.PrismaClientOptions & {
  log: [{ level: 'warn'; emit: 'event' }, { level: 'error'; emit: 'event' }];
};

@Injectable()
export class PrismaService extends PrismaClient<PrismaOptions> implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(PrismaService.name);

  constructor(configService: AppConfigService) {
    const adapter = new PrismaPg({ connectionString: configService.get('DATABASE_URL') });

    super({
      adapter,
      log: [
        {
          level: 'warn',
          emit: 'event',
        },
        {
          level: 'error',
          emit: 'event',
        },
      ],
    });

    this.$on('warn', (e) => this.logger.error(e.message));
    this.$on('error', (e) => this.logger.warn(e.message));
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from database');
  }
}