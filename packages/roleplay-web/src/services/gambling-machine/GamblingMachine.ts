import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {GamblingMachineService} from './GamblingMachine.types';
import {
  GamblingMachine,
  GamblingMachineDTO,
} from '@instinct-plugin/roleplay-types';

export class GamblingMachineServiceImplementation
  implements GamblingMachineService
{
  async create(gamblingMachineDTO: GamblingMachineDTO) {
    const newGamblingMachine: AxiosResponse<GamblingMachine> =
      await backendAPI.post('gambling-machines', gamblingMachineDTO);
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
