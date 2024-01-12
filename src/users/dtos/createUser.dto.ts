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
export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  @ApiProperty({ required: true })
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another name.',
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
