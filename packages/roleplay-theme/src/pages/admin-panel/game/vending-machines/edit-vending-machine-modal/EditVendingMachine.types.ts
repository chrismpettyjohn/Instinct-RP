import {VendingMachine} from '@instinct-plugin/roleplay-types';

export interface EditVendingMachineProps {
  vendingMachine: VendingMachine;
  onChange(): void;
}
