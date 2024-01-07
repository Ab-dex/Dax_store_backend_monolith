import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  getOk(): string {
    return "Server works fine"
  }
}
