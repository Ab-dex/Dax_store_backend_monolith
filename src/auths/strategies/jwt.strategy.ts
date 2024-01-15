import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersUseCases } from '../../use-cases/users/users.use-cases';
import { JwtPayload } from '../../domain/dtos/auths/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersUseCases,
    private readonly configureService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configureService.get<string>('APP_JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    console.log(this.configureService.get('APP_JWT_SECRET'));
    if (!payload) {
      throw new UnauthorizedException();
    }
    // const isValidUser = await this.usersService.validateUser(payload.email);
    // if (!isValidUser) {
    //   throw new UnauthorizedException();
    // }
    return true;
  }
}
