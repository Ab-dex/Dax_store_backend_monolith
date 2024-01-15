import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsUserAlreadyExist } from '../../../users/constraints/email-exists.constraints';
import { IsEqualTo } from '../../../users/constraints/password-match.constraints';

export class RegisterUserDto {
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
  @IsString()
  @ApiProperty({ required: true })
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
  @ApiProperty({ required: true })
  lastname: string;

  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ required: true })
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword()
  @IsEqualTo('password')
  @ApiProperty({ required: true })
  confirmPassword: string;
}
