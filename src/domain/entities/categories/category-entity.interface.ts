import { Entity } from '@app/common/domain/entity';
export interface ICategoryEntity extends Entity<ICategoryEntity> {
  get name(): string;

  set name(name: string);

  get description(): string;

  set description(description: string);

  get iconUrl(): string;

  set iconUrl(iconUrl: string);

  toString(): ICategoryEntity;
}
