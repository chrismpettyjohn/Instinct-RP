import {PoliticalPartyService} from './PoliticalParty.types';
import {PoliticalPartyMockImplementation} from './PoliticalParty.mock';
import {PoliticalPartyServiceImplementation} from './PoliticalParty';

export const politicalPartyService: PoliticalPartyService =
  process.env.NODE_ENV !== 'test'
    ? new PoliticalPartyServiceImplementation()
    : new PoliticalPartyMockImplementation();
