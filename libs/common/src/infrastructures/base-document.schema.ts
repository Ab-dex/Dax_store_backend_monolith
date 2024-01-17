import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { BaseModelInterface } from './base-document.interface';

export abstract class BaseDocumentSchema implements BaseModelInterface {
  @Prop({ type: SchemaTypes.ObjectId })
  id?: Types.ObjectId;

  @Prop({ type: String, immutable: true })
  created_At: string;

  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  modified_At?: string;
}
