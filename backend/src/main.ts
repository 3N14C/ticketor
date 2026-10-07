import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ENVIRONMENTS } from '@common/config';
import { ObserveInstrument } from '@infrastructure/observe/observe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    instrument: ObserveInstrument,
  });
  const config = app.get(ConfigService);

  app.enableShutdownHooks();

  const trustProxyHops = config.getOrThrow<number>(ENVIRONMENTS.trustProxy);
  if (trustProxyHops > 0) app.set('trust proxy', trustProxyHops);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors({
    origin: config.getOrThrow<string>(ENVIRONMENTS.cors.origin),
    credentials: config.getOrThrow<boolean>(ENVIRONMENTS.cors.credentials),
  });

  await app.listen(config.getOrThrow<number>(ENVIRONMENTS.port));
}
void bootstrap();
