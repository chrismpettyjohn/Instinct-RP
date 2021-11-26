import {VendingMachineService} from './VendingMachine.types';
import {
  exampleVendingMachine,
  VendingMachineDTO,
} from '@instinct-plugin/roleplay-types';

export class VendingMachineMock implements VendingMachineService {
  async create(vendingMachineDTO: VendingMachineDTO) {
    return exampleVendingMachine;
  }

  async getAll() {
    return [exampleVendingMachine];
  }

  async getByID(vendingMachineID: string) {
    return exampleVendingMachine;
  }

  async updateByID(
    vendingMachineID: string,
    vendingMachineDTO: VendingMachineDTO
  ) {}

  async deleteByID(vendingMachineID: string) {}
}
