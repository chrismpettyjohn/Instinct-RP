import {CrimeService} from './Crime.types';
import {CrimeServiceMock} from './Crime.mock';
import {CrimeServiceImplementation} from './Crime';

export const crimeService: CrimeService =
  process.env.NODE_ENV !== 'test'
    ? new CrimeServiceImplementation()
    : new CrimeServiceMock();
