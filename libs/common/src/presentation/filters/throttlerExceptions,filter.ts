import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from '@app/common/presentation/filters/validation.exception';
import { Request, Response } from 'express';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(ThrottlerException)
export class ThrottlerExceptionsFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();

    const [title, message] = (exception.getResponse() as string).split(':');

    response.status(statusCode).json({
      title,
      createdBy: 'Rate limiter',
      path: request.originalUrl,
      isSuccess: false,
      error: {
        statusCode: statusCode,
        details: message.trim(),
      },
    });
  }
}
