import {
  VendingMachine,
  VendingMachineDTO,
} from '@instinct-plugin/roleplay-types';

export interface VendingMachineService {
  create(vendingMachineDTO: VendingMachineDTO): Promise<VendingMachine>;
  getAll(): Promise<VendingMachine[]>;
  getByID(vendingMachineID: string): Promise<VendingMachine>;
  updateByID(
    vendingMachineID: string,
    vendingMachineDTO: VendingMachineDTO
  ): Promise<void>;
  deleteByID(vendingMachineID: string): Promise<void>;
}
