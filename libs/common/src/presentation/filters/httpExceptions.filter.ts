import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Catches all HttpExceptions within the app
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    console.log(exception.getResponse());
    const errorBody = Object.create(exception.getResponse() as object);

    response.status(status).json({
      path: request.originalUrl,
      title: errorBody.error,
      isSuccess: false,
      error: {
        statusCode: status,
        details: errorBody.message,
      },
    });
  }
}
