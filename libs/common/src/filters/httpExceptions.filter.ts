import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

      
      const errorBody = Object.create(exception.getResponse() as object)

      response.status(status).json({
          path: request.url,  
          title: errorBody.error,
          error: {
              statusCode: status,
              details: errorBody.message,
          }
    });
  }
}