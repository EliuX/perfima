import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';
import { DuplicateExceptionFilter } from './error/duplicate-exception.filter';
import { GlobalExceptionFilter } from './error/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  setupSwagger(app);
  setupGlobalFilters(app);

  await app.listen(configService.getApiServerPort() ?? 3000);
}

function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Perfima API')
    .setDescription('API for Perfima to demo backends built with NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

function setupGlobalFilters(app: INestApplication): void {
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new DuplicateExceptionFilter(),
  );
}


bootstrap();
