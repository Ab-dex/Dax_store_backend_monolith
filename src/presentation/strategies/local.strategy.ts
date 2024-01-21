import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthsUseCases } from '../../use-cases/auths/auths.use-cases';
import { UserDTO } from "../../domain";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly configureService: ConfigService,
    private readonly authService: AuthsUseCases,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const authData = await this.authService.validateUser({
      email,
      password,
    });

    return authData;
  }
}
