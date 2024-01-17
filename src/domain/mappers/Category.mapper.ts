import { Injectable } from '@nestjs/common';
import { IMapper } from '@app/common/domain/mapper';
import { CategoryEntity, ICategoryEntity } from '../entities/categories';
import { ICategoryModel } from '../../infrastructure/data-services/mongo/model/category-model/category-model.interface';
import { CategoryDocument } from '../../infrastructure/data-services/mongo/model/category-model/category.model';
import { CategoryDto } from "../dtos/categories/category.dto";

@Injectable()
export class CategoryMapper
  implements IMapper<ICategoryEntity, CategoryDocument>
{
  toModelData(entity: ICategoryEntity): CategoryDocument {
    const { description, name, iconUrl } = entity;
    const newProductModel: CategoryDocument = {
      description,
      name,
      iconUrl,
      created_At: Date.now().toString(),
    } as CategoryDocument;

    return newProductModel;
  }

  /**
   *
   * @param model : takes in the product-user-model data of type UserDocument
   * extract _id from the product-user-model and pass it separately to the toDomain method to create an entity
   * @returns instance of an entity
   */
  toDomain(model: CategoryDocument): ICategoryEntity {
    const category: ICategoryEntity = CategoryEntity.create({
      ...model.toObject(),
      id: model._id,
    }).getValue();
    return category;
  }
}
