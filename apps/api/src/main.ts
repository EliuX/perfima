import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  setupSwagger(app);

  await app.listen(configService.getApiServerPort() ?? 3000);
}

function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Perfima API')
    .setDescription('API for Perfima')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}


bootstrap();
