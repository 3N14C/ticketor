import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env.schema';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validationSchema: envSchema })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}