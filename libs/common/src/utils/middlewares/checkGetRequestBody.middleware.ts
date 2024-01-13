import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Result } from '../../domain/result';

@Injectable()
export class CheckGetRequestBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET' && Object.keys(req.body).length > 0) {
      //   return Result.fail("Request Body not allowed", HttpStatus.BAD_REQUEST)
      throw new BadRequestException('Request Body not allowed');
    }
    next();
  }
}
