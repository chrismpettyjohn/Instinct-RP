import {VendingMachine} from './VendingMachine';

export type VendingMachineDTO = Omit<VendingMachine, 'id'>;
