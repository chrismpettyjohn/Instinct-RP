import {Crime, CrimeDTO} from '@instinct-plugin/roleplay-types';

export interface CrimeService {
  create(crimeDTO: CrimeDTO): Promise<Crime>;
  getAll(): Promise<Crime[]>;
  getByID(crimeID: string): Promise<Crime>;
  updateByID(crimeID: string, crimeDTO: CrimeDTO): Promise<void>;
  deleteByID(crimeID: string): Promise<void>;
}
