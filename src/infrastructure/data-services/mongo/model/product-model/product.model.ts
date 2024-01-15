import { BaseDocumentSchema } from '@app/common/infrastructures/base-document.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IProductModel } from './product-model.interface';

export type ProductDocument = ProductModel & Document;

/*
 * @description: Base product-user-model for user from which a schema is generated for mongodb collection
 */
@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class ProductModel extends BaseDocumentSchema implements IProductModel {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  brandImage: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: [String], required: false })
  images: string[];

  @Prop({ type: [Number], required: false })
  sizes: number[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
