import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
// import * as session from 'cookie-session';
import * as swaggerUi from 'swagger-ui-express';
import { AppModule } from './app.module';
import { AllExceptionsFilterLogger } from './logging/http-exceptions-logger.filter';
import { winstonLoggerOptions } from './logging/winston.options';
import { LoggingInterceptor } from './logging/logging.interceptor';
import * as swaggerDocument from '../post.openAPI.json';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { ClientsService } from './clients/clients.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // cookie-session
  // app.use(
  //   session({
  //     name: 'session',
  //     keys: ['key1', 'key2'],
  //     secure: true,
  //     httpOnly: true,
  //     domain: 'example.com',
  //     path: 'foo/bar',
  //     expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour,
  //   }),
  // );
  const logger = winston.createLogger(winstonLoggerOptions);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilterLogger(logger));

  const clientService = app.get<ClientsService>(ClientsService);

  app.use('/health', (req: any, res: any, next: any) => {
    const now = Date.now();
    writeFileSync(
      join(__dirname, '..', '..', 'stats', `${now}.txt`),
      new Date().toISOString(),
    );
    res.send({ status: configService.get('app.name') });
  });

  app.use('/deep-health', async (req: any, res: any, next: any) => {
    const { data: postsHealth } = await clientService.postsAPI.health();
    const {
      data: notificationsHealth,
    } = await clientService.notificationsAPI.health();
    const { data: votesHealth } = await clientService.votesAPI.health();

    const now = Date.now();
    writeFileSync(
      join(__dirname, '..', '..', 'stats', `${now}.txt`),
      new Date().toISOString(),
    );
    res.send({ postsHealth, notificationsHealth, votesHealth });
  });

  app.use(['/', '/api'], swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
