import {RPRank} from '../rank';
import {UserRPStats} from './RPStats';
import {User} from '@instinct-prj/interface';

export interface RPUser extends Omit<User, 'rank'> {
  rank: RPRank;
  rpStats: UserRPStats;
}
