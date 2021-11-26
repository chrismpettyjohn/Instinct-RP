import {AxiosResponse} from 'axios';
import {GangService} from './Gang.types';
import {Gang} from '@instinct-plugin/roleplay-types';
import {backendAPI} from '@instinct-web/core';

export class GangServiceImplementation implements GangService {
  async getAll() {
    const gangs: AxiosResponse<Gang[]> = await backendAPI.get('gangs');
    return gangs.data;
  }

  async getByID(gangID: string) {
    const gang: AxiosResponse<Gang> = await backendAPI.get(`gangs/${gangID}`);
    return gang.data;
  }
}
