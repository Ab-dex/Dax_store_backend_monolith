export interface IUser {
  id: string
  email: string;
  firstname: string;
  lastname: string;
  isVerified: boolean;
  roles: string[];
}
