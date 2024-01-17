import { PickType } from '@nestjs/swagger';
import { RegisterUserDto } from './create-auth.dto';

export class LoginAuthDto extends PickType(RegisterUserDto, [
  'email',
  'password',
]) {}
