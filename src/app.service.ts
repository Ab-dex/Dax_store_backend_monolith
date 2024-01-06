import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  getOk(): string {
    throw new InternalServerErrorException("something went wrong");
  }
}
