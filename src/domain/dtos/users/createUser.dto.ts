import { RegisterUserDto } from '../auths';
import { OmitType } from '@nestjs/swagger';
export class CreateUserDto extends OmitType(RegisterUserDto, [
  'confirmPassword',
]) {}
