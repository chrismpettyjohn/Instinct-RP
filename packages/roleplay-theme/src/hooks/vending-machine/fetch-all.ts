import {createFetchHook} from '@instinct-web/core';
import {VendingMachine} from '@instinct-plugin/roleplay-types';
import {vendingMachineService} from '@instinct-plugin/roleplay-web';

export const useFetchAllVendingMachines = (refresh = 0) =>
  createFetchHook<VendingMachine[]>(vendingMachineService.getAll, refresh);
