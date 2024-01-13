import { IMapper } from '@app/common/domain/mapper';
import { IProductEntity } from 'src/products/entities/product-entity.interface';
import { IProductModel } from 'src/products/model/product-model.interface';

export type IProductMapper = IMapper<IProductEntity, IProductModel>;
