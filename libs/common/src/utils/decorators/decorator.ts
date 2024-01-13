import { SetMetadata } from "@nestjs/common";
import { AUTH_GUARD_CONFIG, IAuthGuardConfig } from "@app/common/utils/guards/guards-config";

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const AllowUnauthenticatedRequest = () => {
  return SetMetadata(AUTH_GUARD_CONFIG, {
    disabled: true,
  } as unknown as IAuthGuardConfig);
};
