import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
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
    const isValidUser = await this.usersService.validateUser(payload.email);
    if (!isValidUser) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
