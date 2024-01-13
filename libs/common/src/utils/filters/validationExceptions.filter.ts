import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from './validation.exception';

// Catches only validationException types. This is a custom type I created that inherits from Bad Exception type. Created this to distinguish from any other bad request I may create in the future. Hence class validator exception factory method throws Validation exception instead of just bad request exception while this filer handles the specific exception
@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorBody = Object.create(exception.getResponse() as object);

    response.status(400).json({
      statusCode: 400,
      title: errorBody.error,
      createdBy: 'validationFilter',
      validationErrors: exception.validationErrors,
    });
  }
}
