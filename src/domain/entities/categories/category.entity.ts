import { Entity } from '@app/common/domain/entity';
import { Types } from 'mongoose';
import { Result } from '@app/common/domain/result';
import { CategoryDto } from '../../dtos/categories/category.dto';
import { ICategoryEntity } from './category-entity.interface';

/**
 * @description: entity is the instance of m domain object at every point.
 */
export class CategoryEntity
  extends Entity<ICategoryEntity>
  implements ICategoryEntity
{
  private _name: string;
  private _description: string;
  private _iconUrl: string;
  constructor({ id, name, description, iconUrl }: Partial<CategoryDto>) {
    super(new Types.ObjectId(id));
    this._name = name;
    this._description = description;
    this._iconUrl = iconUrl;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
  get description(): string {
    return this._description;
  }
  set description(description: string) {
    this._description = description;
  }
  get iconUrl(): string {
    return this._iconUrl;
  }
  set iconUrl(iconUrl: string) {
    this._iconUrl = iconUrl;
  }

  toString(): ICategoryEntity {
    const { id, name, description, iconUrl } = this;
    return {
      id: id,
      name: name,
      description: description,
      iconUrl: iconUrl,
    } as ICategoryEntity;
  }

  // put these things in the constructor, make them private and create custom getters and setters for them to prevent null values

  /**
   *
   * @param props : takes in user product-user-model
   * @param id: optional
   * @returns : an custom result of an instance of entity class. Use the getValue() method in the Result context to get every field within the class
   */

  static create(props: Partial<CategoryDto>): Result<ICategoryEntity> {
    return Result.ok(new CategoryEntity(props).toString());
  }
}
