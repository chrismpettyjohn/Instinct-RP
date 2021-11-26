import {createFetchHook} from '@instinct-web/core';
import {Crime} from '@instinct-plugin/roleplay-types';
import {crimeService} from '../../services/crime';

export const useFetchAllCrimes = () =>
  createFetchHook<Crime[]>(crimeService.getAll);
