import { Module } from '@nestjs/common';
import { PromModule } from '@digikare/nestjs-prom';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleExampleModule } from './moduleExample/moduleExample.module';
import configuration from './config/configuration';
// import ormConfig from './ormconfig';
import { ClientsModule } from './clients/clients.module';

const evnVariable = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ClientsModule,
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
    // TypeOrm
    // TypeOrmModule.forRoot(ormConfig()),
    ModuleExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
