import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../domain/abstracts';
import { IMapper } from '@app/common/domain/mapper';

@Injectable()
export class CategoriesUseCases {
  constructor(
    private dataService: IDataServices, // private mapper: IMapper<any, any>
  ) {}

  getCategpries() {
    return '';
  }

  setOneCategory() {
    return '';
  }

  createCategory() {
    return '';
  }

  updateCategory() {
    return '';
  }

  deleteCategory() {
    return '';
  }
}
