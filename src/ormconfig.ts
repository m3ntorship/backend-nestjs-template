import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'sqlite',
  // host: process.env.DB_HOST,
  // port: +process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
  logging: process.env.DB_LOGGING === 'false' ? false : false,
  entities: [__dirname + process.env.DB_ENTITIES],
  migrations: [__dirname + process.env.DB_MIGRATIONS],
  subscribers: [__dirname + process.env.DB_SUBSCRIBERS],
  cli: {
    entitiesDir: process.env.DB_CLI_ENT_DIR,
    migrationsDir: process.env.DB_CLI_MIGRATION_DIR,
    subscribersDir: process.env.DB_CLI_SUBSCRIBERS_DIR,
  },
});
