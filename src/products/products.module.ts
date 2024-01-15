import { Module } from '@nestjs/common';
import { ProductsUseCases } from '../use-cases/products/products.use-cases';
import { ProductsController } from '../controllers/products/products.controller';
import { TYPE } from 'src/Constants';
import { ProductsRepository } from './repository/products.repository';
import { ProductMapper } from '../domain/mappers/Product.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './model/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsUseCases,
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
