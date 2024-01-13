import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from '@app/common/utils/decorators/decorator';
import { AUTH_GUARD_CONFIG } from '@app/common/utils/guards/guards-config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const allowEndpoint = this.reflector.get<boolean>(
      AUTH_GUARD_CONFIG,
      context.getHandler(),
    );

    const allowController = this.reflector.get<boolean>(
      AUTH_GUARD_CONFIG,
      context.getClass(),
    );
    return true;
  }
}
