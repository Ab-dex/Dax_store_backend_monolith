import { IGenericDocument } from '@app/common/database/generic-document.interface';
import { IProductEntity } from '../entities/product-entity.interface';
import { IProductModel } from '../model/product-model.interface';

export interface IProductRepository extends IGenericDocument<IProductEntity, IProductModel>{}