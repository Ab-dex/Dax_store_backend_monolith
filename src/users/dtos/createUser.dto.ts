import { IsNotEmpty, IsEmail, IsStrongPassword, IsString } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
    
  @IsNotEmpty()
  @IsString()
  firstname: string
    
  @IsNotEmpty()
  @IsString()
  lastname: string
    
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}