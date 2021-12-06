import {RPRank} from '@instinct-plugin/roleplay-types';

export interface RPRanksService {
  getStaffRanks(): Promise<RPRank[]>;
}
