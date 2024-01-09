import { BaseDocumentSchema } from "@app/common/database/base-document.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUserModel } from "./userModel.interface";
import { Document } from "mongoose";

export type UserDocument = UserModels & Document;

/*
* @description: Base model for user from which a schema is generated for mongodb collection
 */
@Schema()
export class UserModels extends BaseDocumentSchema{

    @Prop({type: String, required: true, unique: true})
    email: string

    @Prop({type: String, required: true})
    firstname: string

    @Prop({type: String, required: true})
    lastname: string

    @Prop({ type: String, required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(UserModels)