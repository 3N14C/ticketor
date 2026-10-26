import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { UsersModule } from '@contexts/users/users.module';
import { AppConfigModule } from '@shared/infrastructure/config/app-config.module';
import { AuthModule } from '@contexts/auth/auth.module';
import { RedisModule } from '@shared/infrastructure/redis/redis.module';
import { ThrottlingModule } from '@shared/infrastructure/throttling/throttling.module';

@Module({
  imports: [AppConfigModule, PrismaModule, RedisModule, ThrottlingModule, UsersModule, AuthModule],
})
export class AppModule {}