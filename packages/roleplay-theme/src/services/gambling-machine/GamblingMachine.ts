import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {GamblingMachineService} from './GamblingMachine.types';
import {GamblingMachine} from '@instinct-plugin/roleplay-types';

export class GamblingMachineServiceImplementation
  implements GamblingMachineService
{
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
}
