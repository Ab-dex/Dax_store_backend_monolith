import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../domain/abstracts';
import { IMapper } from '@app/common/domain/mapper';
import { Result } from '@app/common/domain/result';
import { CategoryMapper } from '../../domain/mappers/Category.mapper';
import { CategoryDto } from '../../domain/dtos/categories/category.dto';
import { CategoryEntity } from '../../domain/entities/categories';
import { CreateCategoryDto } from '../../domain/dtos/categories/create-category.dto';

@Injectable()
export class CategoriesUseCases {
  constructor(
    private dataService: IDataServices,
    private mapper: CategoryMapper,
  ) {}

  async getCategories() {
    const categoryEntitiy = await this.dataService.categories.findAll();
    return categoryEntitiy;
  }

  async getOneCategory(id: string) {
    return await this.dataService.categories.findById(id);
  }

  async createCategory(props: CreateCategoryDto) {
    const categoryEntity = CategoryEntity.create(props).getValue();

    const categoryDoc = this.mapper.toModelData(categoryEntity);
    const createdCategory = await this.dataService.categories.create(
      categoryDoc,
    );
    return createdCategory;
  }

  async updateCategory() {
    return '';
  }

  async deleteCategory() {
    return '';
  }
}
