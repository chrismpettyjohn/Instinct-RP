import {GamblingMachine} from '@instinct-plugin/roleplay-types';

export interface GamblingMachineService {
  getAll(): Promise<GamblingMachine[]>;
  getByID(gamblingMachineID: string): Promise<GamblingMachine>;
}
