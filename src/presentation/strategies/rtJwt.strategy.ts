import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../domain';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configureService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configureService.get('RT_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.headers
      .get('authorization')
      .replace('Bearer', '')
      .trim();
    if (!payload) {
      throw new UnauthorizedException();
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
