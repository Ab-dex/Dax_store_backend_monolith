import { IGenericDocument } from '@app/common/domain/abstracts/generic-document.interface';
import { IProductEntity } from '../../domain/entities/products/product-entity.interface';
import { IProductModel } from '../model/product-model.interface';

export interface IProductRepository extends IGenericDocument<IProductEntity, IProductModel>{}