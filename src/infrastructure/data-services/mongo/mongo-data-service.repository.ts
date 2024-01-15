import { GenericDocumentRepository } from '@app/common/domain/abstracts';
import { Entity } from '@app/common/domain/entity';
import { BaseDocumentSchema } from '@app/common/infrastructures/base-document.schema';
import { Model } from 'mongoose';
import { IMapper } from '@app/common/domain/mapper';

export class MongoDataServiceRepository<
  TEntity extends Entity<TEntity>,
  T extends BaseDocumentSchema,
> extends GenericDocumentRepository<TEntity, T> {
  constructor(
    protected model: Model<T>,
    protected mapper: IMapper<TEntity, T>,
  ) {
    super(model, mapper);
  }
}
