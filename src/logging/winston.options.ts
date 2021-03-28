import * as winston from 'winston';

export const winstonLoggerOptions: winston.LoggerOptions = {
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service-development' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      maxsize: 10000000,
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
      maxsize: 10000000,
    }),
  ],
};
