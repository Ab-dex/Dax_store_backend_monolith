import { IMapper } from "@app/common/domain/mapper";
import { UserEntity } from "../entity/user.entity";
import { UserDocument, UserModel } from "../model/user.model";

export class UserMapper implements IMapper<UserEntity, UserModel>{
    toPersistence(entity: UserEntity): UserModel {
        const { email, password, id } = entity
        const newUserModel: UserModel = {
            
            email,
            password,
            created_At: Date.now().toString()
        }

        return newUserModel
    }
    toDomain(model: UserDocument): UserEntity {
        const { email, password, _id } = model;
        const user: UserEntity = UserEntity.create({ email, password }, _id).getValue();
        return user;
    }
    
}