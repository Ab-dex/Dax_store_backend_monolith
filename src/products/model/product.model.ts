import { BaseDocumentSchema } from "@app/common/database/base-document.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IProductModel } from "./product-model.interface";

export type ProductDocument = ProductModel & Document;

/*
* @description: Base model for user from which a schema is generated for mongodb collection
 */
@Schema()
export class ProductModel extends BaseDocumentSchema implements IProductModel{

    @Prop({type: String, required: true, unique: true})
    name: string

    @Prop({type: String, required: true})
    description: string

    @Prop({type: String, required: true})
    brandImage: string

    @Prop({ type: Number, required: true })
    price: number

    @Prop({ type: Number, required: true })
    quantity: number


    @Prop({ type: [String], required: false })
    images: string[]

    @Prop({ type: [Number], required: false })
    sizes: number[]
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel)