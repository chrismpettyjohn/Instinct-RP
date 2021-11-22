import {Children} from '@instinct-web/core';
import {RPPermissions} from '@instinct-plugin/roleplay-types';

export interface RPPermissionGuardProps {
  children: Children;
  permission: keyof RPPermissions;
  redirect?: boolean;
}
