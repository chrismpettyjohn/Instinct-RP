import {VendingMachineService} from './VendingMachine.types';
import {exampleVendingMachine} from '@instinct-plugin/roleplay-types';

export class VendingMachineMock implements VendingMachineService {
  async getAll() {
    return [exampleVendingMachine];
  }

  async getByID(vendingMachineID: string) {
    return exampleVendingMachine;
  }
}
