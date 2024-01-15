import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppUseCase {
  getOk(): string {
    return 'Server works fine';
  }
}
