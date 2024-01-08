import { IMapper } from "@app/common/domain/mapper";
import { UserEntity } from "../entity/user.entity";
import { UserDocument } from "../model/user.model";

export class UserMapper implements IMapper<UserEntity, UserDocument>{
    toPersistence(entity: UserEntity): UserDocument {
        throw new Error("Method not implemented.");
    }
    toDomain(model: UserDocument): UserEntity {
        const { email, password, _id } = model;
        const user: UserEntity = UserEntity.create({ email, password }, _id).getValue();
        return user;
    }
    
}