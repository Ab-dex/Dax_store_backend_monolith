import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IUser } from "./user.interface";

export class UserDTO implements IUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
    @IsString()
  password: string;
}
