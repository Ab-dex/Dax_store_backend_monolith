import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  ProductDocument,
  ProductModel,
} from 'src/products/model/product.model';
import { IProductMapper } from './product-mapper.interface';
import { IProductEntity } from 'src/products/entities/product-entity.interface';
import { Types } from 'mongoose';

@Injectable()
export class ProductMapper implements IProductMapper {
  toModelData(entity: ProductEntity): ProductDocument {
    const { description, name, brandImage, price, quantity, images } = entity;
    const newProductModel: ProductDocument = {
      description,
      name: name,
      images,
      price,
      quantity,
      brandImage,
      created_At: Date.now().toString(),
      _id: new Types.ObjectId(),
    } as ProductDocument;

    return newProductModel;
  }

  /**
   *
   * @param model : takes in the model data of type UserDocument
   * extract _id from the model and pass it separately to the toDomain method to create an entity
   * @returns instance of an entity
   */
  toDomain(model: ProductDocument): IProductEntity {
    const products: IProductEntity = ProductEntity.create(
      model,
      model._id,
    ).getValue();
    return products;
  }
}
