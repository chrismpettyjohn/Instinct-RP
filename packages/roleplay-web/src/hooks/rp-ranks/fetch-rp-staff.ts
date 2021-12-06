import {createFetchHook} from '@instinct-web/core';
import {RPRank} from '@instinct-plugin/roleplay-types';
import {rpRanksService} from '@instinct-plugin/roleplay-web';

export const useFetchRPStaff = () =>
  createFetchHook<RPRank[]>(rpRanksService.getStaffRanks);
