import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { BaseModelInterface } from "./base-document.interface";

@Schema()
export abstract class BaseDocumentSchema implements BaseModelInterface {
  @Prop({ type: SchemaTypes.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, immutable: true })
  created_At: string;

  @Prop({ type: String })
  modified_At?: string;
}
