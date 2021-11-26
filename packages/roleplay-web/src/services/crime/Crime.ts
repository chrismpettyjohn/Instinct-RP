import {AxiosResponse} from 'axios';
import {CrimeService} from './Crime.types';
import {backendAPI} from '@instinct-web/core';
import {Crime, CrimeDTO} from '@instinct-plugin/roleplay-types';

export class CrimeServiceImplementation implements CrimeService {
  async create(crimeDTO: CrimeDTO) {
    const newCrime: AxiosResponse<Crime> = await backendAPI.post(
      'crimes',
      crimeDTO
    );
    return newCrime.data;
  }

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

  async updateByID(crimeID: string, crimeDTO: CrimeDTO) {
    await backendAPI.patch(`crimes/${crimeID}`, crimeDTO);
  }

  async deleteByID(crimeID: string) {
    await backendAPI.delete(`crimes/${crimeID}`);
  }
}
