export interface IBaseDocument extends BaseModelInterface {
  readonly _id?: any;
}

export interface BaseModelInterface {
  readonly created_At: string;
  modified_At?: string;
}
