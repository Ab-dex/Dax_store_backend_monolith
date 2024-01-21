import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../domain/dtos/auths/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { AuthsUseCases } from '../../use-cases/auths/auths.use-cases';
import { UserDTO } from '../../domain';

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthsUseCases,
    private readonly configureService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configureService.get('RT_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    const isValidUser = await this.authService.validateUser(payload as UserDTO);
    if (!isValidUser) {
      throw new UnauthorizedException();
    }
    return isValidUser;
  }
}
