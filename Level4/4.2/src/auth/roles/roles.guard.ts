import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

function matchRoles(access: string[], roles: string[]) {
    if (access && !roles) return false;

    return roles.some(r => access.includes(r));
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndMerge<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!roles) { // if there is no roles requirement
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) { // if user haven't any roles
            return false;
        }

        return !!matchRoles(roles, user.roles);
    }
}