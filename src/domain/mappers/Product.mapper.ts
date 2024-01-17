import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/products/product.entity';
import { ProductDocument } from '../../infrastructure/data-services/mongo/model/product-model/product.model';
import { IProductMapper } from './product-mapper.interface';
import { IProductEntity } from '../entities/products/product-entity.interface';
import { Types } from 'mongoose';

@Injectable()
export class ProductMapper implements IProductMapper {
  toModelData(entity: ProductEntity): ProductDocument {
    const { description, name, brandImage, price, quantity, images } = entity;
    const newProductModel: ProductDocument = {
      description,
      name,
      images,
      price,
      quantity,
      brandImage,
      created_At: Date.now().toString(),
    } as ProductDocument;

    return newProductModel;
  }

  /**
   *
   * @param model : takes in the product-user-model data of type UserDocument
   * extract _id from the product-user-model and pass it separately to the toDomain method to create an entity
   * @returns instance of an entity
   */
  toDomain(model: ProductDocument): IProductEntity {
    const products: IProductEntity = ProductEntity.create({
      ...model.toObject(),
      id: model._id,
    }).getValue();
    return products;
  }
}
