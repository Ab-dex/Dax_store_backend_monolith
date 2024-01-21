import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './user.interface';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export enum userRoles {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner',
}
export class UserDTO implements IUser {
  @Expose()
  @IsString()
  @Type(() => String)
  @ApiProperty({ required: true })
  id: string;

  @Expose()
  @IsEmail()
  @ApiProperty({ required: true })
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

  @Expose()
  @ApiProperty({ required: true, default: false })
  @IsBoolean()
  isVerified: boolean;

  @Expose()
  @ApiProperty({ required: true })
  @IsArray()
  @IsEnum(userRoles, { each: true })
  roles: string[];

  @Exclude()
  password: string;
}

export class WithPassword extends UserDTO {password: string};
