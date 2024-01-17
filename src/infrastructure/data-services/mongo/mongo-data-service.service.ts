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
import { ICategoryEntity } from '../../../domain/entities/categories';
import { CategoryDocument } from './model/category-model/category.model';
import { CategoryMapper } from '../../../domain/mappers/Category.mapper';

@Injectable()
export class MongoDataService implements IDataServices, OnApplicationBootstrap {
  products: GenericDocumentRepository<IProductEntity, ProductDocument>;
  users: GenericDocumentRepository<IUserEntity, UserDocument>;
  categories: GenericDocumentRepository<ICategoryEntity, CategoryDocument>;

  constructor(
    @InjectModel('Users')
    protected readonly userModel: Model<UserDocument>,
    @InjectModel('Product')
    protected readonly productModel: Model<ProductDocument>,
    @InjectModel('Category')
    protected readonly categoryModel: Model<CategoryDocument>,
    private userMapper: UserMapper,
    private productMapper: ProductMapper,
    private categoryMapper: CategoryMapper,
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

    this.categories = new MongoDataServiceRepository(
      this.categoryModel,
      this.categoryMapper,
    );
  }
}
