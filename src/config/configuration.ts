export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  app: {
    name: process.env.APP_NAME || 'anonymous',
  },
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
    cli: {
      entityDir: process.env.DB_CLI_ENT_DIR,
      migrationDir: process.env.DB_CLI_MIGRATION_DIR,
      subscriberDir: process.env.DB_CLI_SUBSCRIBERS_DIR,
    },
  },
  clients: {
    posts: {
      baseURL: process.env.POSTS_URL,
    },
    notifications: {
      baseURL: process.env.NOTIFICATIONS_URL,
    },
    upload: {
      baseURL: process.env.UPLOAD_URL,
    },
    media: {
      baseURL: process.env.MEDIA_URL,
    },
    votes: {
      baseURL: process.env.VOTES_URL,
    },
  },
});
