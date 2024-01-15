import { IMapper } from '@app/common/domain/mapper';
import { IProductEntity } from '../entities/products/product-entity.interface';
import { IProductModel } from '../../infrastructure/data-services/mongo/model/product-model/product-model.interface';

export type IProductMapper = IMapper<IProductEntity, IProductModel>;
