import {VendingMachineMock} from './VendingMachine.mock';
import {VendingMachineService} from './VendingMachine.types';
import {VendingMachineImplementation} from './VendingMachine';

export const vendingMachineService: VendingMachineService =
  process.env.NODE_ENV !== 'test'
    ? new VendingMachineImplementation()
    : new VendingMachineMock();
