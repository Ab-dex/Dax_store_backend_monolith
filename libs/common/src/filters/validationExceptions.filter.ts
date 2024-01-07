import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from './validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

      
      const errorBody = Object.create(exception.getResponse() as object)

      response.status(400).json({
          statusCode: 400,
          title: errorBody.error,
          createdBy: "validationFilter",
          validationErrors: exception.validationErrors
    });
  }
}