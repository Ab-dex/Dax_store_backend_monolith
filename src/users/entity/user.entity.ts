import { Entity } from '@app/common/domain/entity';
import { Types } from 'mongoose';
import { IUserEntity } from './user-entity.interface';
import { Result } from '@app/common/domain/result';
import { IUserModel } from '../model/userModel.interface';
import { UserDTO } from '../dtos/user.dto';
import { UserModels } from '../model/user.model';

/**
 * @description: entity is the instance of m domain object at every point.
 */
export class UserEntity extends Entity<IUserModel> implements IUserEntity {
  private _email: string;
  private _password: string;
  private _firstname: string;
  private _lastname: string;

  constructor(
    {
      email,
      password,
      firstname,
      lastname,
    }: Omit<UserModels, 'id'> | Omit<UserDTO, 'id'>,
    _id: Types.ObjectId,
  ) {
    super(_id);
    this._email = email;
    this._password = password;
    this._firstname = firstname;
    this._lastname = lastname;
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

  // put these things in the constructor, make them private and create custom getters and setters for them to prevent null values

  /**
   *
   * @param props : takes in user model
   * @param id: optional
   * @returns : an custom result of an instance of entity class. Use the getValue() method in the Result context to get every field within the class
   */

  static create(
    props: Omit<UserDTO, 'id'> | UserModels,
    id?: Types.ObjectId,
  ): Result<UserEntity> {
    return Result.ok(new UserEntity(props, id));
  }
}
