import { GenericDocumentRepository } from '@app/common/database/generic-document.repository';
import { IProductRepository } from './product-repo.interface';
import { IProductEntity } from '../entities/product-entity.interface';
import { IProductModel } from '../model/product-model.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from '../model/product.model';
import { Model } from 'mongoose';
import { IProductMapper } from 'src/mappers/product-mapper.interface';
import { TYPE } from 'src/Constants';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository
  extends GenericDocumentRepository<IProductEntity, IProductModel>
  implements IProductRepository
{
  constructor(
    @InjectModel('Product') protected readonly model: Model<ProductDocument>,
    @Inject(TYPE.IProducMapper) protected readonly mapper: IProductMapper,
  ) {
    super(model, mapper);
  }
}
