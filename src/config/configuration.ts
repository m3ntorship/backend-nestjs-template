export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
    sync: process.env.DB_SYNC,
    logging: process.env.DB_LOGGING,
    entities: process.env.DB_ENTITIES,
    migrations: process.env.DB_MIGRATIONS,
    subscribers: process.env.DB_SUBSCRIBERS,
    cliEntityDir: process.env.DB_CLI_ENT_DIR,
    cliMigrationDir: process.env.DB_CLI_MIGRATION_DIR,
    cliSubscriberDir: process.env.DB_CLI_SUBSCRIBERS_DIR,
  },
});
