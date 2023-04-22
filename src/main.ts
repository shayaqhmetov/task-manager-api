import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';

import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.iterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
