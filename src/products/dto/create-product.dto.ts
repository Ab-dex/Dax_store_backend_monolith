import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

  @IsDefined()
  @IsNotEmpty()
      @IsString()
  @Transform(title =>
      title.value.split(" ").filter(ele => ele !== "").map((indivi: string) => {
          return indivi.charAt(0).toUpperCase() + indivi.slice(1)
      }).join(" ")
      )
  @ApiProperty({ required: true })
  name: string;
    
    @IsDefined()
  @IsNotEmpty()
      @IsString()
  @ApiProperty({ required: true })
  description: string;
    
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  brandImage: string
    
    
    @IsNumber()
  @ApiProperty({required: true})
  price: number
    @IsNumber()
  @ApiProperty({required: true})
  quantity: number
    
  @IsOptional()
  @IsArray({each: true})
  @ApiProperty({ required: false })
  images: string[]
    
    
    @IsOptional()
    @Type(() => Number)
     @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @ArrayUnique({ each: true })
    @ApiProperty({
        isArray: true,
        type: Number,
        default: undefined,
        required: false
    })
  sizes: number[]
    
  
  
    
}


