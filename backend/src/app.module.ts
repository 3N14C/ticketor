import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [CoreModule, ModulesModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
