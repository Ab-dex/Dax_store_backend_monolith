import {
  GenericDocumentRepository,
  IGenericDocument,
} from '@app/common/domain/abstracts';
import { Entity } from '@app/common/domain/entity';
import { BaseDocumentSchema } from '@app/common/infrastructures/base-document.schema';
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
} from 'mongoose';
import { IMapper } from '@app/common/domain/mapper';
import { Result } from '@app/common/domain/result';

export class MongoGenericRepository<TEntity, T extends BaseDocumentSchema>
  implements IGenericDocument<Entity<TEntity>, T>
{
  private _model: Model<T>;
  private _mapper: IMapper<TEntity, T>;

  constructor(model: Model<T>, mapper: IMapper<TEntity, T>) {

  }

  create(
    document: any,
    options?: SaveOptions,
  ): Promise<Result<Entity<TEntity>>> {
    return Promise.resolve(undefined);
  }

  deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    return Promise.resolve(false);
  }

  deleteOne(filterQuery: FilterQuery<T>): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAll(
    filterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions<T>,
  ): Promise<Result<Entity<TEntity>[] | null>> {
    return Promise.resolve(undefined);
  }

  findById(
    id: any,
    projection?: ProjectionType<T> | null,
  ): Promise<Result<Entity<TEntity> | null>> {
    return Promise.resolve(undefined);
  }

  findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
  ): Promise<Result<Entity<TEntity> | null>> {
    return Promise.resolve(undefined);
  }

  findOneAndUpdate(
    id: string,
    update: UpdateQuery<T>,
  ): Promise<Result<Entity<TEntity> | null>> {
    return Promise.resolve(undefined);
  }

  insertMany(docs: any): Promise<Result<Entity<TEntity>[]>> {
    return Promise.resolve(undefined);
  }

  updateOne(filter: any, query: any): Promise<Result<Entity<TEntity>>> {
    return Promise.resolve(undefined);
  }

  upsert(id: string, document: Partial<T>): Promise<any> {
    return Promise.resolve(undefined);
  }
}
