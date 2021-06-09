import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import generateErrorBasedOnCurrentEnvironment from '../utils/Logging/generateErrorBasedOnEnvironment';
import { Logger } from 'winston';
import { getNow } from '../utils/datetime';

@Catch()
export class AllExceptionsFilterLogger implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { headers, method, originalUrl } = ctx.getRequest();
    delete headers.authorization;
    const { message, stack } = exception;

    this.logger.error({
      ...exception,
      request: {
        headers,
        method,
        originalUrl,
      },
      timestamp: getNow(),
    });

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorToBeReturned = generateErrorBasedOnCurrentEnvironment(
      status,
      message,
      stack,
      process.env.NODE_ENV,
    );

    response.status(status).json(errorToBeReturned);
  }
}
