import {createFetchHook} from '@instinct-web/core';
import {Food, GamblingMachine} from '@instinct-plugin/roleplay-types';
import {gamblingMachineService} from '../../services/gambling-machine';

export const useFetchAllGamblingMachines = () =>
  createFetchHook<GamblingMachine[]>(gamblingMachineService.getAll);
