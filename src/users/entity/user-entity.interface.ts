export interface IUserEntity {
  get email(): string;

  set email(email: string);

  get password(): string;

  set password(password: string);
}
