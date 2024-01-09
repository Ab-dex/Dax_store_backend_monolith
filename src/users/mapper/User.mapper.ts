import { IMapper } from "@app/common/domain/mapper";
import { UserEntity } from "../entity/user.entity";
import { UserDocument, UserModel } from "../model/user.model";
import { UserDTO } from "../dtos/user.dto";

export class UserMapper implements IMapper<UserEntity, UserModel>{
    toModelData(entity: UserEntity): UserModel {

        console.log("I was called")
        const { email, password, firstname, lastname, id } = entity
        const newUserModel: UserModel = {
            
            email,
            firstname,
            lastname,
            password,
            created_At: Date.now().toString()
        }

        return newUserModel
    }
    toDomain(model: UserDocument): UserEntity {
        const { email, password, firstname, lastname, _id } = model;
        const user: UserEntity = UserEntity.create({email, firstname, lastname, password} as UserDTO, _id).getValue();
        return user;
    }
    
}