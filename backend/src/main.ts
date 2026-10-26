import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StandardSchemaValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DomainErrorFilter } from '@shared/presentation/http/filters/domain-error.filter';
import { AppConfigService } from '@shared/infrastructure/config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const config = app.get(AppConfigService);

  app.enableShutdownHooks();

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1', prefix: 'v' });
  app.useGlobalPipes(
    new StandardSchemaValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new DomainErrorFilter());

  app.use(helmet(), cookieParser());
  app.set('trust proxy', config.get('TRUST_PROXY'));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ticketor API Documentation')
    .setVersion('1')
    .addCookieAuth('accessToken')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey, methodKey) =>
      `${controllerKey.replace(/Controller$/, '')}${methodKey[0].toUpperCase()}${methodKey.slice(1)}`,
  });
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: config.get('CORS_ORIGIN'),
    credentials: config.get('CORS_CREDENTIALS'),
  });

  await app.listen(config.get('PORT'));
}
void bootstrap();
