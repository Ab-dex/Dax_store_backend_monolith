import { Module } from '@nestjs/common';
import { CategoriesUseCases } from './categories.use-cases';
import { IDataServices } from '../../domain/abstracts';
import { DataServicesModule } from '../../services';
import { CategoryMapper } from '../../domain/mappers/Category.mapper';

@Module({
  imports: [DataServicesModule],
  providers: [CategoriesUseCases, CategoryMapper],
  exports: [CategoriesUseCases],
})
export class CategoriesUseCasesModule {}
