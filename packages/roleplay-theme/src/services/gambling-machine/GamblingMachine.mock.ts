import {GamblingMachineService} from './GamblingMachine.types';
import {
  exampleGamblingMachine,
  GamblingMachineDTO,
} from '@instinct-plugin/roleplay-types';

export class GamblingMachineServiceMock implements GamblingMachineService {
  async create(gamblingMachineDTO: GamblingMachineDTO) {
    return exampleGamblingMachine;
  }

  async getAll() {
    return [exampleGamblingMachine];
  }

  async getByID(foodID: string) {
    return exampleGamblingMachine;
  }

  async updateByID(foodID: string, gamblingMachineDTO: GamblingMachineDTO) {}

  async deleteByID(foodID: string) {}
}
