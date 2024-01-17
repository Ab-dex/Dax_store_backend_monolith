import { IProductEntity, IUserEntity } from '../entities';
import { UserDocument } from '../../infrastructure/data-services/mongo/model/user-model/user.model';
import { ProductDocument } from '../../infrastructure/data-services/mongo/model/product-model/product.model';
import { GenericDocumentRepository } from '@app/common/domain/abstracts/generic-document.repository';
import { ICategoryEntity } from '../entities/categories';
import { CategoryDocument } from '../../infrastructure/data-services/mongo/model/category-model/category.model';

export abstract class IDataServices {
  abstract users: GenericDocumentRepository<IUserEntity, UserDocument>;
  abstract products: GenericDocumentRepository<IProductEntity, ProductDocument>;
  abstract categories: GenericDocumentRepository<
    ICategoryEntity,
    CategoryDocument
  >;
}
