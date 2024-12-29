import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filters/http-error.filter';
import { CustomLogger } from './logger/custom-logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useLogger(app.get(CustomLogger));
  app.useGlobalFilters(new HttpExceptionFilter(app.get(CustomLogger)));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
