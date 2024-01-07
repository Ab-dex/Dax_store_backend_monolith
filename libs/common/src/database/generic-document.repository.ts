import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import {
  ClientSession,
  Connection,
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
} from "mongoose";
import { IGenericDocument } from "./generic-document.interface";
import { Result } from "../domain/result";
import { IMapper } from "../domain/mapper";
import { BaseDocumentSchema } from "./base-document.schema";

export abstract class GenericDocumentRepository<TEntity, T extends BaseDocumentSchema> implements IGenericDocument<TEntity, T> {
  constructor(
    protected readonly model: Model<T>,
    readonly connection: Connection,
    private readonly mapper: IMapper<TEntity, T>
  ) {}

    async create(document: any, options?: SaveOptions): Promise<Result<TEntity>> {
    const doc = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    const result = (await (await doc.save(options)).toJSON()) as T;
    if (!result) {
      return Result.fail("An Error occured, unable to save document to db", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const entity = this.mapper.toDomain(result);
    return Result.ok(entity);
    }
  
  
  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null>,
    options?: QueryOptions<T>
  ): Promise<Result<TEntity[] | null>> {
    try {
      const documents = await this.model.find(filterQuery, projection, {...options, lean: true});
    const entities: TEntity[] = documents?.length ? documents.map((document) => this.mapper.toDomain(document as Model<T> | any)) : [];
    return Result.ok(entities);
    } catch (err) {
     Result.fail("An error occurred, Can not retrieve data from database", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findOne(filterQuery: FilterQuery<T>, projection?: ProjectionType<T | null>): Promise<Result<TEntity | null>> {
    const document = await this.model.findOne(filterQuery, projection);
    if (!document) {
      return Result.fail("No such entry exist in the database", HttpStatus.NOT_FOUND);
    }
    const entity: TEntity = this.mapper.toDomain(document);
    return Result.ok(entity);
  }



  async findById(id: any, projection?: ProjectionType<T> | null): Promise<Result<TEntity | null>> {
    const document = await this.model.findById(id, projection);
    if (!document) {
      return Result.fail("No such entry exist in the database", HttpStatus.NOT_FOUND);
    }
    const entity: TEntity = this.mapper.toDomain(document);
    return Result.ok(entity);
  }



  async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>): Promise<Result<TEntity | null>> {
    const result = await this.model.findByIdAndUpdate(filterQuery, update, {
      new: true,
    });
    if (!result) {
      return Result.fail("An Error occured, unable to update the database", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const entity: TEntity = this.mapper.toDomain(result);
    return Result.ok(entity);
  }

  async upsert(filterQuery: FilterQuery<T>, document: Partial<T>): Promise<any> {
    const result = await this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });

    if (!result) {
      return Result.fail("Unable to update the database", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const entity: TEntity = this.mapper.toDomain(result as Model<T> | any);
    return Result.ok(entity);
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = this.model.deleteMany(filterQuery);
    return (await result).deletedCount >= 1;
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = this.model.deleteOne(filterQuery);
    return (await result).deletedCount === 1;
  }

  async startSession(): Promise<ClientSession> {
    return await this.connection.startSession();
  }

  async insertMany(docs: any): Promise<Result<TEntity[]>> {
    const documents = await this.model.insertMany(docs);
    const entities: TEntity[] = documents.map((doc) => this.mapper.toDomain(doc));
    return Result.ok(entities);
  }

  async updateOne(filter: any, query: any): Promise<Result<TEntity>> {
    const document = await this.model.updateOne(filter, { $set: query });
    const entity: TEntity = this.mapper.toDomain(document as Model<T> | any);
    return Result.ok(entity);
  }
}
