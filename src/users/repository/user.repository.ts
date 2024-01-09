import { Model } from "mongoose";
import { UserDocument } from "../model/user.model";
import { IMapper } from "@app/common/domain/mapper";
import { GenericDocumentRepository } from "@app/common/database/generic-document.repository";
import { UserEntity } from "../entity/user.entity";

export class UserRepository extends GenericDocumentRepository<UserEntity, UserDocument>{

    constructor(
        protected readonly model: Model<UserDocument>,
        protected readonly mapper: IMapper<UserEntity, UserDocument>
    ) {
        super(model, mapper)
    }


    
}