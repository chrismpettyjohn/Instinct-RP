import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {VendingMachineService} from './VendingMachine.types';
import {VendingMachine} from '@instinct-plugin/roleplay-types';

export class VendingMachineImplementation implements VendingMachineService {
  async getAll() {
    const vendingMachines: AxiosResponse<VendingMachine[]> =
      await backendAPI.get('vending-machines');
    return vendingMachines.data;
  }

  async getByID(vendingMachineID: string) {
    const food: AxiosResponse<VendingMachine> = await backendAPI.get(
      `vending-machines/${vendingMachineID}`
    );
    return food.data;
  }
}
