import { IMapper } from "@app/common/domain/mapper";
import { UserEntity } from "../entity/user.entity";
import { UserDocument, UserModels } from "../model/user.model";
import { UserDTO } from "../dtos/user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMapper implements IMapper<UserEntity, UserDocument>{
    toModelData(entity: UserEntity): UserDocument {

        const { email, password, firstname, lastname, id } = entity
        const newUserModel: UserDocument = {
            
            email,
            firstname,
            lastname,
            password,
            created_At: Date.now().toString()
        } as UserDocument

        return newUserModel
    }

    /**
     * 
     * @param model : takes in the model data of type UserDocument
     * extract _id from the model and pass it separately to the toDomain method to create an entity
     * @returns instance of an entity
     */
    toDomain(model: UserDocument): UserEntity {
        
        const { email, password, firstname, lastname, _id } = model;
        const user: UserEntity = UserEntity.create({ email, firstname, lastname, password} as UserModels, _id).getValue();
        return user;
    }
    
}