import {GovernmentService} from './Government.types';
import {exampleBusinessPosition} from '@instinct-plugin/roleplay-types';

export class GovernmentServiceMock implements GovernmentService {
  async getAll() {
    return [exampleBusinessPosition];
  }
}
