import {VendingMachine} from '@instinct-plugin/roleplay-types';

export interface DeleteVendingMachineModalProps {
  vendingMachine: VendingMachine;
  onDelete(): void;
}
