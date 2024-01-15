import { Entity } from '@app/common/domain/entity';
export interface IUserEntity extends Entity<IUserEntity> {
  get email(): string;

  set email(email: string);

  get password(): string;

  set password(password: string);

  get firstname(): string;

  set firstname(firstname: string);

  get lastname(): string;

  set lastname(lastname: string);

  toString(): IUserEntity;
}
