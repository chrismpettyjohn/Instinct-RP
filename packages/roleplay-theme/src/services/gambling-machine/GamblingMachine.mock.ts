import {GamblingMachineService} from './GamblingMachine.types';
import {exampleGamblingMachine} from '@instinct-plugin/roleplay-types';

export class GamblingMachineServiceMock implements GamblingMachineService {
  async getAll() {
    return [exampleGamblingMachine];
  }

  async getByID(foodID: string) {
    return exampleGamblingMachine;
  }
}
