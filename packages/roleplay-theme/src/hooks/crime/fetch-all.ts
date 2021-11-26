import {createFetchHook} from '@instinct-web/core';
import {Crime} from '@instinct-plugin/roleplay-types';
import {crimeService} from '@instinct-plugin/roleplay-web';

export const useFetchAllCrimes = (refresh = 0) =>
  createFetchHook<Crime[]>(crimeService.getAll, refresh);
