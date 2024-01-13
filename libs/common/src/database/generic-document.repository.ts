import {
  ClientSession,
  Connection,
  FilterQuery,
  model,
  Model,
  ProjectionType,
  Promise,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { IGenericDocument } from './generic-document.interface';
import { Result } from '../domain/result';
import { IMapper } from '../domain/mapper';
import { BaseDocumentSchema } from './base-document.schema';
import { Entity } from '../domain/entity';
import { BaseRepository } from './base.repository';
import { filter } from 'rxjs';

export abstract class GenericDocumentRepository<
    TEntity extends Entity<TEntity>,
    T extends BaseDocumentSchema,
  >
  extends BaseRepository<TEntity, T>
  implements IGenericDocument<TEntity, T>
{
  constructor(
    protected readonly model: Model<T>,
    protected readonly mapper: IMapper<TEntity, T>,
    private readonly connection?: Connection,
  ) {
    super(model, mapper);
  }

  async create(document: T, options?: SaveOptions): Promise<Result<TEntity>> {
    return this.createEntry(document, options);
  }

  async findAll(
    filterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions<T>,
  ): Promise<Result<TEntity[]>> {
    return this.find(filterQuery, projection, options);
  }

  // async getCount() {
  //   return this.
  // }

  async findByValues(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<Result<TEntity>> {
    console.log("I was called")
    return this.findOne(filterQuery, projection);
  }

  async findById(
    id: string,
    projection?: Record<string, unknown>,
  ): Promise<Result<TEntity | null>> {
    return this.findOneById(id);
  }

  async findOneAndUpdate(
    id: string,
    update: UpdateQuery<T>,
  ): Promise<Result<TEntity | null>> {
    return this.findByIdAndUpdate(id, update);
  }

  async upsert(
    id: string,
    document: Partial<T>,
  ): Promise<Result<TEntity | null>> {
    return this.findByIdAndUpdate(id, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = this.model.deleteOne({ _id: filterQuery.id });

    return (await result).deletedCount === 1;
  }
  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = this.model.deleteMany(filterQuery);
    return (await result).deletedCount >= 1;
  }

  async startSession(): Promise<ClientSession> {
    return await this.connection?.startSession();
  }

  async insertMany(docs: any): Promise<Result<TEntity[]>> {
    const documents = await this.model.insertMany(docs);
    const entities: TEntity[] = documents.map((doc) =>
      this.mapper.toDomain(doc),
    );
    return Result.ok(entities);
  }

  async updateOne(filter: any, query: any): Promise<Result<TEntity>> {
    const document = await this.model.updateOne(filter, { $set: query });
    const entity: TEntity = this.mapper.toDomain(document as Model<T> | any);
    return Result.ok(entity);
  }
}
