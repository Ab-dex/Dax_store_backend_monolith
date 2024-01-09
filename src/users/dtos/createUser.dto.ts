import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsStrongPassword, IsString } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({required: true})
  email: string;
    
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required: true})
  firstname: string
    
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required: true})
  lastname: string
    
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({required: true})
  password: string;
}