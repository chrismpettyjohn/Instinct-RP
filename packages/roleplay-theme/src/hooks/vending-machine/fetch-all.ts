import {createFetchHook} from '@instinct-web/core';
import {Food, VendingMachine} from '@instinct-plugin/roleplay-types';
import {vendingMachineService} from '../../services/vending-machine';

export const useFetchAllVendingMachines = () =>
  createFetchHook<VendingMachine[]>(vendingMachineService.getAll);
