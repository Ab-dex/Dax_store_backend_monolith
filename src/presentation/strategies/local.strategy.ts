import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersUseCases } from '../../use-cases/users/users.use-cases';
import { LoginAuthDto } from '../../domain/dtos/auths/login-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UsersUseCases) {
    super();
  }

  async validate(user: LoginAuthDto) {
    const _user = await this.userService.validateUser(user);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return user;
  }
}
