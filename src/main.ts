import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { AllExceptionsFilterLogger } from './logging/http-exceptions-logger.filter';
import { winstonLoggerOptions } from './logging/winston.options';
import { LoggingInterceptor } from './logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = winston.createLogger(winstonLoggerOptions);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilterLogger(logger));

  await app.listen(3000);
}
bootstrap();
