import {UserRPStats} from '@instinct-plugin/roleplay-types';

export interface UserService {
  getRPStats(username: string): Promise<UserRPStats>;
}
