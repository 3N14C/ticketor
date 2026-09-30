import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ENVIRONMENTS } from '@core/configs';
import { ObserveInstrument } from '@infrastructure/observe/observe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    instrument: ObserveInstrument,
  });
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser());

  app.enableCors({
    origin: config.getOrThrow<string>(ENVIRONMENTS.cors.origin),
    credentials:
      config.getOrThrow<string>(ENVIRONMENTS.cors.credentials) === 'true',
  });

  await app.listen(config.getOrThrow<number>(ENVIRONMENTS.port));
}
void bootstrap();