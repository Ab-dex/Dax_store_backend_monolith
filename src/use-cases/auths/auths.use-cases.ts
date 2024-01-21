import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersUseCases } from '../users/users.use-cases';
import { RegisterUserDto } from '../../domain/dtos/auths/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Result } from '@app/common/domain/result';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from '../../domain';
import { LoginAuthDto } from '../../domain/dtos/auths/login-auth.dto';
import { comparePassword, hashPassword } from '../../utils/hash-password';

@Injectable()
export class AuthsUseCases {
  constructor(
    @Inject(forwardRef(() => UsersUseCases)) private userService: UsersUseCases,
    private jwtService: JwtService,
    private configureService: ConfigService,
  ) {}
  async create(createAuthDto: RegisterUserDto) {
    const { password, confirmPassword, ...userInfo } = createAuthDto;
    let user;

    // password match has also been handled at the validation constraint level much like email.

    if (password !== confirmPassword) {
      throw new BadRequestException(
        'password and confirm password must be he same',
      );
    }

    // hash the password before creating an entity
    const hashedPwd = await hashPassword(password);

    try {
      user = (
        await this.userService.createUser({ ...userInfo, password: hashedPwd })
      ).getValue();
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
    const validatedUser = await this.validateUser({
      email,
      password,
    } as LoginAuthDto);

    const { accessToken, refreshToken } = await this.getTokens(
      validatedUser.email,
      validatedUser.id,
    );
    return Result.ok({
      ...validatedUser,
      accessToken,
      refreshToken,
    });
  }

  async getTokens(email: string, id: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: id,
        email,
      },
      {
        secret: this.configureService.get('AT_JWT_SECRET'),
        expiresIn: 60 * 30,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: id,
        email,
      },
      {
        secret: 'RT_JWT_SECRET',
        expiresIn: 60 * 60 * 24 * 3,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(
    user: LoginAuthDto,
  ): Promise<Omit<UserDTO, 'password'> | null> {
    const { email, password } = user;
    try {
      const _user = (
        await this.userService.getOneUserByEmail(email, false)
      ).getValue();

      if (!_user) {
        throw new NotFoundException();
      }
      if (_user && (await comparePassword(password, _user.password))) {
        return _user as Omit<UserDTO, 'password'>;
      }
      return null;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw new InternalServerErrorException(err);
    }
  }
}
