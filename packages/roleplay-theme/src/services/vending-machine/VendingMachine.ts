import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {VendingMachineService} from './VendingMachine.types';
import {
  VendingMachine,
  VendingMachineDTO,
} from '@instinct-plugin/roleplay-types';

export class VendingMachineImplementation implements VendingMachineService {
  async create(vendingMachineDTO: VendingMachineDTO) {
    const newVendingMachine: AxiosResponse<VendingMachine> =
      await backendAPI.post('vending-machines', vendingMachineDTO);
    return newVendingMachine.data;
  }

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

  async updateByID(
    vendingMachineID: string,
    vendingMachineDTO: VendingMachineDTO
  ) {
    await backendAPI.patch(
      `vending-machines/${vendingMachineID}`,
      vendingMachineDTO
    );
  }

  async deleteByID(vendingMachineID: string) {
    await backendAPI.delete(`vending-machines/${vendingMachineID}`);
  }
}
