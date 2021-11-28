import {createFetchHook} from '@instinct-web/core';
import {Bounty} from '@instinct-plugin/roleplay-types';
import {bountyService} from '../../services/bounty';

export const useFetchAllBounties = (refresh = 0) =>
  createFetchHook<Bounty[]>(bountyService.getAll, refresh);
