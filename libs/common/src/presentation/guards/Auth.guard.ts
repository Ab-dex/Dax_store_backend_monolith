import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {
  AUTH_GUARD_CONFIG,
  IAuthGuardConfig,
} from '@app/common/presentation/guards/guards-config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const endpointConfig: IAuthGuardConfig =
      this.reflector.get<IAuthGuardConfig>(
        AUTH_GUARD_CONFIG,
        context.getHandler(),
      );

    const controllerConfig: IAuthGuardConfig =
      this.reflector.get<IAuthGuardConfig>(
        AUTH_GUARD_CONFIG,
        context.getClass(),
      );

    return Boolean(endpointConfig?.disabled || controllerConfig?.disabled);
  }
}
