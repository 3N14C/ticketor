import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ENVIRONMENTS } from '@core/configs';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.getOrThrow<string>(ENVIRONMENTS.db.url),
    });
    super({ adapter });
  }
}