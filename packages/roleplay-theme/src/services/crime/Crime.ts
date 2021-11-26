import {AxiosResponse} from 'axios';
import {CrimeService} from './Crime.types';
import {backendAPI} from '@instinct-web/core';
import {Crime} from '@instinct-plugin/roleplay-types';

export class CrimeServiceImplementation implements CrimeService {
  async getAll() {
    const crimes: AxiosResponse<Crime[]> = await backendAPI.get('crimes');
    return crimes.data;
  }

  async getByID(crimeID: string) {
    const crime: AxiosResponse<Crime> = await backendAPI.get(
      `crimes/${crimeID}`
    );
    return crime.data;
  }
}
