import { BaseDocumentSchema } from '@app/common/infrastructures/base-document.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModels & Document;

/*
 * @description: Base product-user-model for user from which a schema is generated for mongodb collection
 */
@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class UserModels extends BaseDocumentSchema {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModels);
