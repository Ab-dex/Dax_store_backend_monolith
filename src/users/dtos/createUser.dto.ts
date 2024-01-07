import { IsNotEmpty, IsEmail, IsStrongPassword, IsString } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
    
  @IsNotEmpty()
  @IsString()
  first_name: string
    
  @IsNotEmpty()
  @IsString()
  last_name: string
    
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}