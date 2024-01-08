import { Entity } from "@app/common/domain/entity";
import { Types } from "mongoose";
import { IUserEntity } from "./user-entity.interface";
import { Result } from "@app/common/domain/result";
import { IUserModel } from "../model/userModel.interface";

/**
 * @description: entity is the instance of m domain object at every point.
 */
export class UserEntity extends Entity<IUserModel> implements IUserEntity {
  _email: string;
  _password: string;
  constructor(id: Types.ObjectId, props: IUserModel) {
    super(id)
    this._email = props.email
    this._password = props.password
  }

    get email() {
    return this._email
    }
  
  set email(email: string) {
    this._email = email
  }
  get password(): string {
    return this._password
  }


  set password(password: string) {
    this._password= password
  }



  // put these things in the constructor, make them private and create custom getters and setters for them to prevent null values


  /**
   * 
   * @param props : takes in user model
   * @param id 
   * @returns : an custom result of an instance of entity class. Use the getValue() method in the Result context to get every field within the class
   */

  static create(props: IUserModel, id?: Types.ObjectId): Result<UserEntity> {
    return Result.ok(new UserEntity(id, props));
  }
}
