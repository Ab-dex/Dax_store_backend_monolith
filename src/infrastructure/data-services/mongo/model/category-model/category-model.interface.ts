import { BaseModelInterface } from '@app/common/infrastructures/base-document.interface';

export interface ICategoryModel extends BaseModelInterface {
  name: string;

  description: string;

  iconUrl: string;
}
