import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { Expose, Type } from 'class-transformer';

export class ProductDTO extends CreateProductDto {
  @Expose()
  @ApiProperty({ required: true })
  @Type(() => String)
  id: string;
}
