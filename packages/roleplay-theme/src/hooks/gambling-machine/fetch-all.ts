import {createFetchHook} from '@instinct-web/core';
import {GamblingMachine} from '@instinct-plugin/roleplay-types';
import {gamblingMachineService} from '@instinct-plugin/roleplay-web';

export const useFetchAllGamblingMachines = (refresh = 0) =>
  createFetchHook<GamblingMachine[]>(gamblingMachineService.getAll, refresh);
