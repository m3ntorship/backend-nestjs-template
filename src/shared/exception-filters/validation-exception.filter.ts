import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Logger } from 'winston';
import { getNow } from '../utils/datetime';
import generateErrorBasedOnCurrentEnvironment from '../utils/Logging/generateErrorBasedOnEnvironment';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { headers, method, originalUrl, url } = ctx.getRequest();
    const response = ctx.getResponse();
    const { stack } = exception;
    delete headers.authorization;

    const { message, statusCode } = exception.getResponse() as {
      message: string | string[];
      statusCode: number;
      error: string;
    };

    // Add logging
    this.logger.error({
      status_code: statusCode,
      message,
      request: {
        headers,
        method,
        originalUrl,
        path: url,
      },
      timestamp: getNow(),
    });

    const errorToBeReturned = generateErrorBasedOnCurrentEnvironment(
      statusCode,
      message as string,
      stack,
      process.env.NODE_ENV,
    );

    response.status(status).json(errorToBeReturned);
  }
}
