import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { Expose, Type } from 'class-transformer';

export class ProductDTO extends PartialType(CreateProductDto) {
  @Expose()
  @ApiProperty({ required: false })
  @Type(() => String)
  id: string;
}
