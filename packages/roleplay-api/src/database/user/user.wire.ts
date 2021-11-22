import {rpRankWire} from '../rank/rank.wire';
import {RPUserEntityStruct} from './user.types';
import {userWire} from '@instinct-api/database';
import {RPUser, UserRPStats} from '@instinct-plugin/roleplay-types';

export function rpUserWire(
  entity: RPUserEntityStruct,
  rpStats: UserRPStats
): RPUser {
  return {
    ...userWire(entity as any),
    rank: rpRankWire(entity.rank!),
    rpStats,
  };
}
