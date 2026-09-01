import {Module} from "@nestjs/common";

import {CoreModule} from './core/core.module';
import {ModulesModule} from './modules/modules.module';
import {InfrastructureModule} from './infrastructure/infrastructure.module';

@Module({
  imports: [CoreModule, ModulesModule, InfrastructureModule],
})
export class AppModule {}