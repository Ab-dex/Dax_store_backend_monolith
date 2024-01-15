import { Module } from '@nestjs/common';
import { ProductsUseCases } from './products.use-cases';

@Module({
  providers: [ProductsUseCases],
  exports: [ProductsUseCases],
})
export class ProductsUseCasesModule {}
