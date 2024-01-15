import { IProductEntity, IUserEntity } from '../entities';
import { UserDocument } from '../../users/model/user.model';
import { ProductDocument } from '../../products/model/product.model';
import { GenericDocumentRepository } from '@app/common/domain/abstracts/generic-document.repository';

export abstract class IDataServices {
  abstract users: GenericDocumentRepository<IUserEntity, UserDocument>;
  abstract products: GenericDocumentRepository<IProductEntity, ProductDocument>;
}
