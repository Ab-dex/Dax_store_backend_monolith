import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "./user.interface";
import { Exclude, Expose } from "class-transformer";

export class UserDTO implements IUser {

  @Expose()
    @ApiProperty({ required: false })
  id: string

  
  @Expose()
    @ApiProperty({ required: false })
  email: string;

  @Expose()
    @ApiProperty({ required: false })
  firstname: string;

  @Expose()
    @ApiProperty({ required: false })
  lastname: string;
  
  @Exclude()
  password: string;
}
