import { PickType } from '@nestjs/swagger';
import { RegisterUserDto } from './create-auth.dto';
import { CreateUserDto, UserDTO } from "../users";

export class LoginAuthDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
