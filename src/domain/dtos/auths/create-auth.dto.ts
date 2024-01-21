import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsUserAlreadyExist } from '../../constraints/email-exists.constraints';
import { IsEqualTo } from '../../constraints/password-match.constraints';
import { UserDTO } from '../users';

export class RegisterUserDto extends OmitType(UserDTO, [
  'id',
  'isVerified',
  'roles',
  'password',
]) {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  @ApiProperty({ required: true })
  // @IsUserAlreadyExist({
  //   message:
  //     'User $value already exists. Please proceed to login, or forgot password to reset your password.',
  // })
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({ required: true })
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword()
  @IsEqualTo('password')
  @ApiProperty({ required: true })
  confirmPassword: string;
}
