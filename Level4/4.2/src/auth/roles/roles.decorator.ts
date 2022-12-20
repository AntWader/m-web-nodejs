import { SetMetadata } from '@nestjs/common';

/**
 * The decorator means: @SetMetadata('roles', roles: string[]).
 * 
 * @param roles ...roles: string[]
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);