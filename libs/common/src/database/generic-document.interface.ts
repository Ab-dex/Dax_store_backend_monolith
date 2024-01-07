import { FilterQuery, ProjectionType, QueryOptions, SaveOptions, UpdateQuery, ClientSession } from "mongoose";
import { Result } from "../domain/result";

export interface IGenericDocument<TEntity, T> {
  findOne(filterQuery: FilterQuery<T>, projection?: ProjectionType<T | null>): Promise<Result<TEntity | null>>;

  findById(id: any, projection?: ProjectionType<T> | null): Promise<Result<TEntity | null>>;

  find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
    options?: QueryOptions<T>
  ): Promise<Result<TEntity[] | null>>;

  create(document: any, options?: SaveOptions): Promise<Result<TEntity>>;

  findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>): Promise<Result<TEntity | null>>;

  upsert(filterQuery: FilterQuery<T>, document: Partial<T>): Promise<any>;

  deleteMany(filterQuery: FilterQuery<T>): Promise<boolean>;

  startSession(): Promise<ClientSession>;

  insertMany(docs: any): Promise<Result<TEntity[]>>;

  updateOne(filter: any, query: any): Promise<Result<TEntity>>;

  deleteOne(filterQuery: FilterQuery<T>): Promise<boolean>;
}
