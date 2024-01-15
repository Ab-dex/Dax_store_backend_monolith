import { Module } from '@nestjs/common';
import { IDataServices } from '../../../domain/abstracts';
import { MongoDataService } from './mongo-data-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user-model/user.model';
import { ConfigModule } from '@nestjs/config';
import { ConfigsModule } from '@app/common/config/core_config/configs.module';
import { ProductSchema } from './model/product-model/product.model';
import { UserMapper } from '../../../domain/mappers/User.mapper';
import { ProductMapper } from '../../../domain/mappers/Product.mapper';
import { DatabaseModule } from '@app/common/infrastructures';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
    DatabaseModule,
    ConfigsModule,
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataService,
    },
    UserMapper,
    ProductMapper,
  ],
  exports: [IDataServices],
})
export class MongoDataServiceModule {}
