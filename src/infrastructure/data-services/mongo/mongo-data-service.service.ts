import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { IDataServices } from '../../../domain/abstracts';
import { GenericDocumentRepository } from '@app/common/domain/abstracts';
import { IProductEntity, IUserEntity } from '../../../domain';
import { ProductDocument } from '../../../products/model/product.model';
import { UserDocument } from '../../../users/model/user.model';

@Injectable()
export class MongoDataService implements IDataServices, OnApplicationBootstrap {

  products: GenericDocumentRepository<IProductEntity, ProductDocument>;
  users: GenericDocumentRepository<IUserEntity, UserDocument>;

  constructor(

  ) {
  }

  onApplicationBootstrap(): any {

  }
}
