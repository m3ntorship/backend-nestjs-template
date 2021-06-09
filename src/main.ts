import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { AllExceptionsFilterLogger } from './shared/exception-filters/http-exceptions-logger.filter';
import { winstonLoggerOptions } from './logging/winston.options';
import { LoggingInterceptor } from './logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Enable cors
  app.enableCors();

  // Helmet
  app.use(helmet());

  // Rate limit
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // Compression
  app.use(compression());

  // Cookie parser
  app.use(cookieParser());

  const logger = winston.createLogger(winstonLoggerOptions);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilterLogger(logger));

  app.use('/health', (req: any, res: any, next: any) => {
    res.send({ status: true });
  });

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
