import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { UsersModule } from '@contexts/users/users.module';
import { AppConfigModule } from '@shared/infrastructure/config/app-config.module';

@Module({
  imports: [PrismaModule, UsersModule, AppConfigModule],
})
export class AppModule {}