import {createFetchHook} from '@instinct-web/core';
import {Food, GamblingMachine} from '@instinct-plugin/roleplay-types';
import {gamblingMachineService} from '../../services/gambling-machine';

export const useFetchAllGamblingMachines = (refresh = 0) =>
  createFetchHook<GamblingMachine[]>(gamblingMachineService.getAll, refresh);
