import { IUser } from "./user.interface";
import { Exclude, Expose } from "class-transformer";

export class UserDTO implements IUser {


  @Expose()
  id: string

  
  @Expose()
  email: string;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;
  @Exclude()
  password: string;
}
