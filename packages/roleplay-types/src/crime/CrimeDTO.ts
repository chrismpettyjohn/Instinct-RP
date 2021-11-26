import {Crime} from './Crime';

export type CrimeDTO = Omit<Crime, 'id'>;
