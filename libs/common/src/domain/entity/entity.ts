import { Types } from 'mongoose';

export abstract class Entity<T> {
  constructor(protected readonly _id: Types.ObjectId) {}

  get id() {
    return this._id;
  }

  equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!this.entityInstance) {
      return false;
    }
    return this._id === object._id;
  }

  entityInstance(v: any) {
    return v instanceof Entity;
  }
}
