import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'winston';
import { formatISO } from 'date-fns';

@Catch()
export class AllExceptionsFilterLogger implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { headers, method, originalUrl, url } = ctx.getRequest();
    delete headers.authorization;
    const { message, stack } = exception;

    this.logger.error({
      message,
      request: {
        headers,
        method,
        originalUrl,
      },
      stack,
      timestamp: formatISO(Date.now()),
    });

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: message,
      stack,
      timestamp: formatISO(Date.now()),
      path: url,
    });
  }
}
