import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';
import { NonnegativeInteger } from '@app/common/presentation/NonNegativeInteger.type';
import { IsOptional } from 'class-validator';

export class UpdateProductDto extends OmitType(ProductDTO, ['id']) {
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsOptional()
  @ApiProperty({ required: false })
  categoryId: string;

  @IsOptional()
  @ApiProperty({ required: false })
  brandImage: string;

  @IsOptional()
  @ApiProperty({ required: false })
  price: NonnegativeInteger<number>;

  @IsOptional()
  @ApiProperty({ required: false })
  quantity: NonnegativeInteger<number>;
}
