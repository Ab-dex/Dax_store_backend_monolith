import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
  ClientSession,
} from 'mongoose';
import { Result } from '../result';
import { BaseDocumentSchema } from '../../infrastructures/base-document.schema';

export interface IGenericDocument<TEntity, T extends BaseDocumentSchema> {
  findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
  ): Promise<Result<TEntity | null>>;

  findById(
    id: any,
    projection?: ProjectionType<T> | null,
  ): Promise<Result<TEntity | null>>;

  findAll(
    filterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions<T>,
  ): Promise<Result<TEntity[] | null>>;

  create(document: any, options?: SaveOptions): Promise<Result<TEntity>>;

  findOneAndUpdate(
    id: string,
    update: UpdateQuery<T>,
  ): Promise<Result<TEntity | null>>;

  upsert(id: string, document: Partial<T>): Promise<any>;

  deleteMany(filterQuery: FilterQuery<T>): Promise<boolean>;

  startSession(): Promise<ClientSession>;

  insertMany(docs: any): Promise<Result<TEntity[]>>;

  updateOne(filter: any, query: any): Promise<Result<TEntity>>;

  deleteOne(filterQuery: FilterQuery<T>): Promise<boolean>;
}
