import {GangService} from './Gang.types';
import {GangServiceMock} from './Gang.mock';
import {GangServiceImplementation} from './Gang';

export const gangService: GangService =
  process.env.NODE_ENV !== 'test'
    ? new GangServiceImplementation()
    : new GangServiceMock();
