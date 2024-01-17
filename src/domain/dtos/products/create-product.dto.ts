import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { NonnegativeInteger } from '@app/common/presentation/NonNegativeInteger.type';
import { IsNonNegativeNumber } from '../../constraints/NonNegativeNumber.constraints';

export class CreateProductDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Transform((title) =>
    title.value
      .split(' ')
      .filter((ele) => ele !== '')
      .map((indivi: string) => {
        return indivi.charAt(0).toUpperCase() + indivi.slice(1);
      })
      .join(' '),
  )
  @ApiProperty({ required: true })
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Transform((desc) =>
    desc.value
      .split(' ')
      .filter((ele) => ele !== '')
      .join(' '),
  )
  @ApiProperty({ required: true })
  description: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  categoryId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  brandImage: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty({ required: true })
  @IsNonNegativeNumber()
  price: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty({ required: true })
  @IsNonNegativeNumber()
  quantity: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ required: false })
  @ArrayUnique()
  images: string[];

  @IsOptional()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @ArrayUnique()
  @ArrayMaxSize(12)
  @ApiProperty({
    isArray: true,
    type: Number,
    default: undefined,
    required: false,
  })
  sizes: NonnegativeInteger<number>[];
}
