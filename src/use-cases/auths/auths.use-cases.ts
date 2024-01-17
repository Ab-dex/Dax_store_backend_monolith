import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersUseCases } from '../users/users.use-cases';
import { RegisterUserDto } from '../../domain/dtos/auths/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Result } from '@app/common/domain/result';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from '../../domain';

@Injectable()
export class AuthsUseCases {
  constructor(
    @Inject(forwardRef(() => UsersUseCases)) private userService: UsersUseCases,
    private jwtService: JwtService,
    private configureService: ConfigService,
  ) {}
  async create(createAuthDto: RegisterUserDto) {
    let user;
    try {
      user = (await this.userService.createUser(createAuthDto)).getValue();
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }

    const { accessToken, refreshToken } = await this.getTokens(
      user.email,
      user.id,
    );
    return Result.ok({
      ...user,
      accessToken,
      refreshToken,
    });
  }

  async signIn(email: string, password: string) {
    const user = (await this.userService.validateUser(email)).getValue();
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    console.log(user)
    return plainToInstance(UserDTO, user);
  }

  async getTokens(email: string, id: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: id,
        email,
      },
      {
        secret: 'small-secret',
        expiresIn: 60 * 30,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: id,
        email,
      },
      {
        secret: 'big-secret',
        expiresIn: 60 * 60 * 24 * 3,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
