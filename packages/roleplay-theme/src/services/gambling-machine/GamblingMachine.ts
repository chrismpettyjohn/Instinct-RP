import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {GamblingMachineService} from './GamblingMachine.types';
import {
  FoodDTO,
  GamblingMachine,
  GamblingMachineDTO,
} from '@instinct-plugin/roleplay-types';

export class GamblingMachineServiceImplementation
  implements GamblingMachineService
{
  async create(foodDTO: FoodDTO) {
    const newGamblingMachine: AxiosResponse<Food> = await backendAPI.post(
      'gambling-machines',
      foodDTO
    );
    return newGamblingMachine.data;
  }

  async getAll() {
    const gamblingMachines: AxiosResponse<GamblingMachine[]> =
      await backendAPI.get('gambling-machines');
    return gamblingMachines.data;
  }

  async getByID(gamblingMachineID: string) {
    const gamblingMachine: AxiosResponse<GamblingMachine> =
      await backendAPI.get(`gambling-machines/${gamblingMachineID}`);
    return gamblingMachine.data;
  }

  async updateByID(
    gamblingMachineID: string,
    gamblingMachineDTO: GamblingMachineDTO
  ) {
    await backendAPI.patch(
      `gambling-machines/${gamblingMachineID}`,
      gamblingMachineDTO
    );
  }

  async deleteByID(gamblingMachineID: string) {
    await backendAPI.delete(`gambling-machines/${gamblingMachineID}`);
  }
}
