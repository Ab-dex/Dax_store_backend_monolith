import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsString,
  IsDefined,
} from 'class-validator';
import { IsUserAlreadyExist } from '../constraints/email-exists.constraints';
import { Transform } from 'class-transformer';
import { IsEqualTo } from '../constraints/password-match.constraints';
export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  @IsUserAlreadyExist({
    message:
      'Email $value already exists. Proceed to forgot password to reset password if you lost you password.',
  })
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Transform(
    (firstname) =>
      firstname.value.trim().charAt(0).toUpperCase() +
      firstname.value.trim().slice(1),
  )
  firstname: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Transform(
    (lastname) =>
      lastname.value.trim().charAt(0).toUpperCase() +
      lastname.value.trim().slice(1),
  )
  lastname: string;

  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEqualTo('password')
  confirmPassword: string;
}
