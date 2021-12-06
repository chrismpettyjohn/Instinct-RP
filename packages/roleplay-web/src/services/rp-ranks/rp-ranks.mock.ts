import {RPRanksService} from './rp-ranks.types';

export class RPRanksServiceMock implements RPRanksService {
  async getStaffRanks() {
    return [];
  }
}
