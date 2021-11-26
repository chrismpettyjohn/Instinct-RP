import {VendingMachine} from '@instinct-plugin/roleplay-types';

export interface VendingMachineService {
  getAll(): Promise<VendingMachine[]>;
  getByID(vendingMachineID: string): Promise<VendingMachine>;
}
