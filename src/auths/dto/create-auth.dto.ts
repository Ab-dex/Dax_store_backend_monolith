import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsUserAlreadyExist } from '../../users/constraints/email-exists.constraints';

export class RegisterUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  @ApiProperty({ required: true })
  @IsUserAlreadyExist({
    message:
      'User $value already exists. Sign up with another email or login to this email.',
  })
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
}
