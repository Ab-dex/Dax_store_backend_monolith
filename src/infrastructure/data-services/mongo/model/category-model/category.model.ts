import { BaseDocumentSchema } from '@app/common/infrastructures/base-document.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICategoryModel } from './category-model.interface';

export type CategoryDocument = CategoryModel & Document;

/*
 * @description: Base product-user-model for user from which a schema is generated for mongodb collection
 */
@Schema()
export class CategoryModel
  extends BaseDocumentSchema
  implements ICategoryModel
{
  @Prop({ type: String, unique: true, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false, default: null })
  iconUrl: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
