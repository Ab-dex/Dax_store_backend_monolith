import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './user.interface';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsEnum } from 'class-validator';

export enum userRoles {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner',
}
export class UserDTO implements IUser {
  @Expose()
  @ApiProperty({ required: false })
  id: string;

  @Expose()
  @ApiProperty({ required: false })
  email: string;

  @Expose()
  @ApiProperty({ required: false })
  firstname: string;

  @Expose()
  @ApiProperty({ required: false })
  lastname: string;

  @Expose()
  @ApiProperty({ required: true })
  isVerified: boolean;

  @Expose()
  @ApiProperty({ required: true })
  @IsArray()
  @IsEnum(userRoles, { each: true })
  roles: string[];

  @Exclude()
  password: string;
}
