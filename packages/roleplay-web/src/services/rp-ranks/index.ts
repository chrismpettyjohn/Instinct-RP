import {RPRanksService} from './rp-ranks.types';
import {RPRanksServiceMock} from './rp-ranks.mock';
import {RPRanksServiceImplementation} from './rp-ranks.service';

export const rpRanksService: RPRanksService =
  process.env.NODE_ENV !== 'test'
    ? new RPRanksServiceImplementation()
    : new RPRanksServiceMock();
