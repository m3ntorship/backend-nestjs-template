import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PromModule } from '@digikare/nestjs-prom';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleExampleModule } from './moduleExample/moduleExample.module';
import configuration from './config/configuration';
import config from './config/database';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../openapi/example.openapi.json';

const evnVariable = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      // load different .env files based on runtime environment variable
      envFilePath: [`.${evnVariable}.env`],
      isGlobal: true,
      load: [configuration],
    }),
    PromModule.forRoot({
      withHttpMiddleware: {
        enable: true,
      },
    }),
    TypeOrmModule.forRoot(config),
    ModuleExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  // Add swagger middleware to /api endpoint only
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(swaggerUi.serve, swaggerUi.setup(swaggerDocument))
      .exclude('/api/(.[a-z0-9-/]*)')
      .forRoutes('/');
  }
}
