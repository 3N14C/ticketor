import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ENVIRONMENTS } from '@common/config';

const GLOBAL_OMIT = { user: { password: true } } as const;

@Injectable()
export class PrismaService
  extends PrismaClient<{ adapter: PrismaPg; omit: typeof GLOBAL_OMIT }>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.getOrThrow<string>(ENVIRONMENTS.db.url),
    });
    super({ adapter, omit: GLOBAL_OMIT });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
