import {LawService} from './Law.types';
import {LawServiceMock} from './Law.mock';
import {LawServiceImplementation} from './Law';

export const lawService: LawService =
  process.env.NODE_ENV !== 'test'
    ? new LawServiceImplementation()
    : new LawServiceMock();
