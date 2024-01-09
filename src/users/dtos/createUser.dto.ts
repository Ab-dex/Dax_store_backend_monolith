import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsStrongPassword, IsString, IsDefined } from "class-validator";
import { IsUserAlreadyExist } from "../constraints/email-exists.constraints";
export class CreateUserDto {
  @IsDefined()
    @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another name.',
  })
  email: string;
    
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required: true})
  firstname: string
    
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required: true})
  lastname: string
    
  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({required: true})
  password: string;
}