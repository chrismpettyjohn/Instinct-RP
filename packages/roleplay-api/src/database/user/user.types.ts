import {UserEntityStruct} from '@instinct-api/database';
import {RPRankEntityStruct} from '../rank/rank.types';
import {UserRPStatEntity} from './rp-stats.entity';
import {PoliticalPartyMemberEntity} from '../political-party/political-party-member.entity';

export interface RPUserEntityStruct extends Omit<UserEntityStruct, 'rank'> {
  rank?: RPRankEntityStruct;
  rpStats?: UserRPStatEntity;
  politicalParty?: PoliticalPartyMemberEntity;
}
