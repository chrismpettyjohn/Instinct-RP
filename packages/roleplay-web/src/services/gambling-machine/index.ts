import {GamblingMachineService} from './GamblingMachine.types';
import {GamblingMachineServiceMock} from './GamblingMachine.mock';
import {GamblingMachineServiceImplementation} from './GamblingMachine';

export const gamblingMachineService: GamblingMachineService =
  process.env.NODE_ENV !== 'test'
    ? new GamblingMachineServiceImplementation()
    : new GamblingMachineServiceMock();
