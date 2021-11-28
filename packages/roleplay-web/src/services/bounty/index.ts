import {BountyService} from './Bounty.types';
import {BountyServiceMock} from './Bounty.mock';
import {BountyServiceImplementation} from './Bounty';

export const bountyService: BountyService =
  process.env.NODE_ENV !== 'test'
    ? new BountyServiceImplementation()
    : new BountyServiceMock();
