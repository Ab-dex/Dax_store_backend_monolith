
export class IUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  
  password: string;
}
