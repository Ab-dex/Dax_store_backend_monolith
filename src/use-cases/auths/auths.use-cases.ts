import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersUseCases } from '../users/users.use-cases';
import { RegisterUserDto } from '../../domain/dtos/auths/create-auth.dto';

@Injectable()
export class AuthsUseCases {
  constructor(
    @Inject(forwardRef(() => UsersUseCases)) private userService: UsersUseCases,
  ) {}
  create(createAuthDto: RegisterUserDto) {
    return this.userService.createUser(createAuthDto);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.validateUser(email);
    return user;
  }
}
