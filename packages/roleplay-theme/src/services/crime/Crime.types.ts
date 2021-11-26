import {Crime} from '@instinct-plugin/roleplay-types';

export interface CrimeService {
  getAll(): Promise<Crime[]>;
  getByID(crimeID: string): Promise<Crime>;
}
