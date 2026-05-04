import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { requestContext } from './common/request-context';
import { Logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    const requestId = randomUUID();
    requestContext.run({ requestId }, () => next());
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest course API ')
    .setDescription('API documentation for Nest JS course')
    .setVersion('1.0.0')
    .setContact('IT ViMax', 'it-vimax.com.ua', 'it.vimax@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule]
  });

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: 'swagger.json',
  });

  app.use(Logger);

  await app.listen(3000);
}
bootstrap();
