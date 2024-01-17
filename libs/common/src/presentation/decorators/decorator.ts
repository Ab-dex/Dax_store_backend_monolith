import { SetMetadata } from '@nestjs/common';
import {
  AUTH_GUARD_CONFIG,
  IAuthGuardConfig,
} from '@app/common/presentation/guards/guards-config';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const AllowUnauthenticatedRequest = () => {
  return SetMetadata(AUTH_GUARD_CONFIG, {
    disabled: true,
  } as unknown as IAuthGuardConfig);
};

export const DisallowUnauthenticatedRequest = () => {
  return SetMetadata(AUTH_GUARD_CONFIG, {
    disabled: false,
  } as unknown as IAuthGuardConfig);
};
