import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import ormConfig from './ormconfig';

const evnVariable = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      // load different .env files based on runtime environment variable
      envFilePath: [`.${evnVariable}.env`],
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    // TypeOrm
    // TypeOrmModule.forRoot(ormConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
