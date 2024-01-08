import { BaseDocumentSchema } from "@app/common/database/base-document.schema";
import { Entity } from "../entity";

export interface IMapper<TEntity, TModel extends BaseDocumentSchema> {
  toPersistence(entity: TEntity): TModel;
  toDomain(model: TModel): TEntity;
}
