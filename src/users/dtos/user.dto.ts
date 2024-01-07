import { IsEmail, IsNotEmpty } from "class-validator";

export class IUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;


  password: string;
}
