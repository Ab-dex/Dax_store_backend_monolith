import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TYPE } from 'src/Constants';
import { ProductsRepository } from './repository/products.repository';
import { ProductMapper } from 'src/mappers/Product.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './model/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: TYPE.IProductsRepository,
      useClass: ProductsRepository,
    },
    {
      provide: TYPE.IProducMapper,
      useClass: ProductMapper,
    },
  ],
})
export class ProductsModule {}
