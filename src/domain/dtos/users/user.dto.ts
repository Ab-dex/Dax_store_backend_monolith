import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './user.interface';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';

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

  @Expose()
  @IsString()
  @ApiProperty({ required: true })
  firstname: string;

  @Expose()
  @IsString()
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
