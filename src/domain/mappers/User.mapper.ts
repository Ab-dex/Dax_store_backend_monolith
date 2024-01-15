import { IMapper } from '@app/common/domain/mapper';
import { UserEntity } from '../entities/users/user.entity';
import { UserDocument } from '../../infrastructure/data-services/mongo/model/user-model/user.model';
import { Injectable } from '@nestjs/common';
import { IUserEntity } from '../entities';

@Injectable()
export class UserMapper implements IMapper<IUserEntity, UserDocument> {
  toModelData(entity: IUserEntity): UserDocument {
    const { email, password, firstname, lastname, id } = entity;
    const newUserModel: UserDocument = {
      email,
      firstname,
      lastname,
      password,
      created_At: Date.now().toString(),
    } as UserDocument;

    return newUserModel;
  }

  /**
   *
   * @param model : takes in the product-user-model data of type UserDocument
   * extract _id from the product-user-model and pass it separately to the toDomain method to create an entity
   * @returns instance of an entity
   */
  toDomain(model: UserDocument): IUserEntity {
    const user: IUserEntity = UserEntity.create(model).getValue();
    return user;
  }
}
