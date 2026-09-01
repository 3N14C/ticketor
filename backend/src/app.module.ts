import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [CoreModule, InfrastructureModule, ApiModule],
})
export class AppModule {}