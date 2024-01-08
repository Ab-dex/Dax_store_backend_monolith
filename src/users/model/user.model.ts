import { BaseDocumentSchema } from "@app/common/database/base-document.schema";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IUserModel } from "./userModel.interface";

export type UserDocument = UserModel & Document;

/*
* @description: Base model for user from which a schema is generated for mongodb collection
 */
export class UserModel extends BaseDocumentSchema implements IUserModel{

    @Prop({type: String, required: true, unique: true})
    email: string

    @Prop({ type: String })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(UserModel)