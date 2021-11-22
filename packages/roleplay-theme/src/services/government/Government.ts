import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {GovernmentService} from './Government.types';
import {BusinessPosition} from '@instinct-plugin/roleplay-types';

export class GovernmentServiceImplementation implements GovernmentService {
  async getAll() {
    const govCorps: AxiosResponse<BusinessPosition[]> = await backendAPI.get(
      'government'
    );
    return govCorps.data;
  }
}
