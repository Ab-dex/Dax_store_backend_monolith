import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { BaseDocumentSchema } from './base-document.schema';
import { Result } from '../domain/result';
import { IMapper } from '../domain/mapper';
import {
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

export abstract class BaseRepository<TEntity, T extends BaseDocumentSchema> {
  constructor(
    protected readonly model: Model<T>,
    protected readonly mapper: IMapper<TEntity, T>,
  ) {}

  async createEntry(
    document: T,
    options?: SaveOptions,
  ): Promise<Result<TEntity>> {
    const doc = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    const result = (await doc.save(options)).toJSON() as T;
    if (!result) {
      return Result.fail(
        'An Error occured, unable to save document to db',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const entity = this.mapper.toDomain(result);

    return Result.ok(entity);
  }

  async find(
    filterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions<T>,
  ): Promise<Result<TEntity[] | null>> {
    try {
      const documents = await this.model.find(
        filterQuery,
        { __v: 0, ...projection },
        options,
      );

      const entities: TEntity[] = documents?.length
        ? documents.map((document) =>
            this.mapper.toDomain(document as Model<T> | any),
          )
        : [];

      return Result.ok(entities);
    } catch (err) {
      Result.fail(
        'An error occurred, Can not retrieve data from database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCount(filterQuery?: FilterQuery<T>): Promise<Result<number>> {
    const count = await this.model.countDocuments(filterQuery, { lean: true });
    return Result.ok(count);
  }

  async findOne(
    filterQuery: any,
    projection?: Record<string, unknown>,
  ): Promise<Result<TEntity | null>> {
    const document = await this.model.findOne(filterQuery, projection);

    if (!document) {
      return Result.fail(
        'No such entry exist in the database',
        HttpStatus.NOT_FOUND,
      );
    }

    const entity: TEntity = this.mapper.toDomain(document);
    return Result.ok(entity);
  }

  async findOneById(id: string): Promise<Result<TEntity | null>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException('Provided id is not valid');
    }

    const document = await this.model.findById(id);
    if (!document) {
      throw new NotFoundException();
    }
    const entity: TEntity = this.mapper.toDomain(document);
    return Result.ok(entity);
  }

  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<Result<TEntity | null>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException('Provided id is not valid');
    }
    const result = await this.model.findByIdAndUpdate(id, update, {
      ...(options ? options : { new: true }),
    });

    if (!result) {
      return Result.fail(
        'The entity you are trying to update does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    const entity: TEntity = this.mapper.toDomain(result);
    return Result.ok(entity);
  }
}
