import {HasScope} from '@instinct-api/session';
import {RPPermissions} from '@instinct-plugin/roleplay-types';

export function HasRPScope(scope: keyof RPPermissions) {
  return HasScope(scope as any);
}
