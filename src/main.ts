import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors(CORS);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port || 8001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
