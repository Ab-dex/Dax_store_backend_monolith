import { Entity } from '@app/common/domain/entity';
import { ObjectId, Schema, Types } from "mongoose";
import { IUserEntity } from './user-entity.interface';
import { Result } from '@app/common/domain/result';
import { UserDTO } from '../../dtos/users/user.dto';
import { UserModels } from '../../../infrastructure/data-services/mongo/model/user-model/user.model';

/**
 * @description: entity is the instance of m domain object at every point.
 */
export class UserEntity extends Entity<IUserEntity> implements IUserEntity {
  private _email: string;
  private _password: string;
  private _firstname: string;
  private _lastname: string;
  private _isVerified: boolean;
  private _roles: string[];
  constructor({
    id,
    email,
    password,
    firstname,
    lastname,
    roles,
    isVerified,
  }: Partial<UserDTO> | UserModels) {
    super(new Types.ObjectId(id));
    this._email = email;
    this._password = password;
    this._firstname = firstname;
    this._lastname = lastname;
    this._roles = roles;
    this._isVerified = isVerified;
  }

  get roles(): string[] {
    return this._roles;
  }
  set roles(roles: string[]) {
    this._roles = roles;
  }

  get isVerified(): boolean {
    return this._isVerified;
  }
  set isVerified(isVerified: boolean) {
    this._isVerified = isVerified;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }
  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(firstname: string) {
    this._firstname = firstname;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(lastname: string) {
    this._lastname = lastname;
  }

  toString(): IUserEntity {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      roles: this.roles,
      isVerified: this.isVerified,
    } as IUserEntity;
  }

  // put these things in the constructor, make them private and create custom getters and setters for them to prevent null values

  /**
   *
   * @param props : takes in user product-user-model
   * @param id: optional
   * @returns : an custom result of an instance of entity class. Use the getValue() method in the Result context to get every field within the class
   */

  static create(props: UserModels | Partial<UserDTO>): Result<IUserEntity> {
    return Result.ok(new UserEntity(props).toString());
  }
}
