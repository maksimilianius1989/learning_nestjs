import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest course API ')
    .setDescription('API documentation for Nest JS course')
    .setVersion('1.0.0')
    .setContact('IT ViMax', 'it-vimax.com.ua', 'it.vimax@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: 'swagger.json',
  });

  await app.listen(3000);
}
bootstrap();
