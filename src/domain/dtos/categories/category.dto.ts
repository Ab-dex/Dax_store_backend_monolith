import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({ description: 'id of category' })
  id: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'name of category' })
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'description for category' })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'url of desired icon for the category',
    required: false,
  })
  iconUrl?: string;
}
