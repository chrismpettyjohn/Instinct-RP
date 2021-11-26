import {CrimeService} from './Crime.types';
import {exampleCrime} from '@instinct-plugin/roleplay-types';

export class CrimeServiceMock implements CrimeService {
  async getAll() {
    return [exampleCrime];
  }

  async getByID(crimeID: string) {
    return exampleCrime;
  }
}
