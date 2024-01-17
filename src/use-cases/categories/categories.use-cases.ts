import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../domain/abstracts';
import { IMapper } from '@app/common/domain/mapper';
import { Result } from '@app/common/domain/result';
import { CategoryMapper } from '../../domain/mappers/Category.mapper';

@Injectable()
export class CategoriesUseCases {
  constructor(
    private dataService: IDataServices,
    private mapper: CategoryMapper,
  ) {}

  async getCategpries() {
    const categoryEntitiy = (
      await this.dataService.categories.findAll()
    ).getValue();
    return categoryEntitiy;
  }

  async setOneCategory() {
    return '';
  }

  async createCategory() {
    // const categoryEntity =
    return Result.ok('Hello');
  }

  async updateCategory() {
    return '';
  }

  async deleteCategory() {
    return '';
  }
}
