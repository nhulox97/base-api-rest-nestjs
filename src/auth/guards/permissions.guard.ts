import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const endpointPermissions: string[] | undefined = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!endpointPermissions) {
      return true;
    }

    const userRoles: string[] = context.switchToHttp().getRequest()?.user?.permissions;

    const hasAccess = endpointPermissions?.every((epPermission) =>
      userRoles?.includes(epPermission),
    );

    return hasAccess;
  }
}
