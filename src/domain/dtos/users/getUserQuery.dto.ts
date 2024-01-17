import { Expose, Transform, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUsersQueryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'max item per page',
    required: false,
    default: 100,
  })
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'current page', required: false, default: 1 })
  currentPage?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({ description: 'firstname of user', required: false })
  firstname?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({ description: 'lastname of user', required: false })
  lastname?: string;

  @IsOptional()
  @Type(() => String)
  @Transform((email) => email?.value?.trim().toLowerCase())
  @IsEmail()
  @ApiProperty({ description: 'user email', required: false })
  email?: string;
}
