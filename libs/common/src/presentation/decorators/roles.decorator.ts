import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 'admin',
  Owner = 'owner',
  User = 'user',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
