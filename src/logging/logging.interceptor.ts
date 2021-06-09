import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Logger } from 'winston';
import * as dayjs from 'dayjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const { headers, method, originalUrl } = httpContext.getRequest();
    delete headers.authorization;
    const start = dayjs();
    return next.handle().pipe(
      tap(() => {
        const end = dayjs();
        this.logger.info({
          request: {
            headers,
            method,
            originalUrl,
          },
          timestamp: dayjs(start).format(),
          responseTime: end.diff(start),
        });
      }),
    );
  }
}
