import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/create-auth.dto';

@Injectable()
export class AuthsService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
  ) {}
  create(createAuthDto: RegisterUserDto) {
    return this.userService.createUser(createAuthDto);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.validateUser(email);
    return user;
  }
}
