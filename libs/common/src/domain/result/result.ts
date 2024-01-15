import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
export class Result<T> {
  isSuccess: boolean;
  private data?: any;
  private error?: any;
  message: string;
  errorCode: HttpStatus;
  constructor(
    isSuccess: boolean,
    data?: any,
    message?: string,
    errorCode?: HttpStatus,
  ) {
    this.data = isSuccess ? data : undefined;
    this.error = !isSuccess
      ? { statusCode: errorCode, details: message }
      : undefined;
    this.isSuccess = isSuccess;
    this.message = isSuccess ? message : undefined;
  }

  getValue(): T {
    return this.data;
  }

  static ok<U>(data: U, message?: string): Result<U> {
    return new Result(true, data, message);
  }

  static fail<U>(message: string, errorcode: HttpStatus): Result<U> {
    return new Result(false, null, message, errorcode);
  }
}
