import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from '../../../domain/abstracts';
import { GenericDocumentRepository } from '@app/common/domain/abstracts';
import { IProductEntity, IUserEntity } from '../../../domain';
import { ProductDocument } from './model/product-model/product.model';
import { UserDocument } from './model/user-model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoDataServiceRepository } from './mongo-data-service.repository';
import { IMapper } from '@app/common/domain/mapper';
import { UserMapper } from '../../../domain/mappers/User.mapper';
import { ProductMapper } from '../../../domain/mappers/Product.mapper';

@Injectable()
export class MongoDataService implements IDataServices, OnApplicationBootstrap {
  products: GenericDocumentRepository<IProductEntity, ProductDocument>;
  users: GenericDocumentRepository<IUserEntity, UserDocument>;

  constructor(
    @InjectModel('Users')
    protected readonly userModel: Model<UserDocument>,
    @InjectModel('Product')
    protected readonly productModel: Model<ProductDocument>,

    private userMapper: UserMapper,
    private productMapper: ProductMapper,
  ) {}

  onApplicationBootstrap(): any {
    this.products = new MongoDataServiceRepository(
      this.productModel,
      this.productMapper,
    );

    this.users = new MongoDataServiceRepository(
      this.userModel,
      this.userMapper,
    );
  }
}
