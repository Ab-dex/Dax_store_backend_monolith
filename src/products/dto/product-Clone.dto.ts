import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";
import { Expose } from "class-transformer";

export class ProductDTO {
    @Expose()
    @ApiProperty({ required: false })
    id: string
}