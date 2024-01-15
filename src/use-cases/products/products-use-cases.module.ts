import { Module } from '@nestjs/common';
import { ProductsUseCases } from './products.use-cases';
import { DataServicesModule } from '../../services';
import { ProductMapper } from '../../domain/mappers/Product.mapper';

@Module({
  imports: [DataServicesModule],
  providers: [ProductsUseCases, ProductMapper],
  exports: [ProductsUseCases],
})
export class ProductsUseCasesModule {}
