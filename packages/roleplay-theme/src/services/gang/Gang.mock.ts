import {GangService} from './Gang.types';
import {exampleGang} from '@instinct-plugin/roleplay-types';

export class GangServiceMock implements GangService {
  async getAll() {
    return [exampleGang];
  }

  async getByID(gangID: string) {
    return exampleGang;
  }
}
