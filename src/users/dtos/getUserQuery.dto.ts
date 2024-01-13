import { Expose, Transform, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersQueryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Expose()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Expose()
  currentPage?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @Expose()
  firstname?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @Expose()
  lastname?: string;

  @IsOptional()
  @Type(() => String)
  @Transform((email) => email?.value?.trim().toLowerCase())
  @IsEmail()
  @Expose()
  email?: string;
}
