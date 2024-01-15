import { IMapper } from '@app/common/domain/mapper';
import { IProductEntity } from '../entities/products/product-entity.interface';
import { IProductModel } from '../../products/model/product-model.interface';

export type IProductMapper = IMapper<IProductEntity, IProductModel>;
