import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async signIn(username: string, password: string) {
    const user = await this.userService.verifyUser('aboje@gmail.com');
    console.log(user);
    return user;
  }
}
