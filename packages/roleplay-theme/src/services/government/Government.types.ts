import {BusinessPosition} from '@instinct-plugin/roleplay-types';

export interface GovernmentService {
  getAll(): Promise<BusinessPosition[]>;
}
