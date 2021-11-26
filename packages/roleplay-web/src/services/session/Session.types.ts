import {RPUser} from '@instinct-plugin/roleplay-types';

export interface RPSessionService {
  getRPUser(): Promise<RPUser>;
}
