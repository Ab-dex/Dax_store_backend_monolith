import { IUser } from "./user.interface";
import { Exclude } from "class-transformer";

export class UserDTO implements IUser {

  id: string
  email: string;
  firstname: string;
  lastname: string;
  @Exclude()
  password: string;
}
