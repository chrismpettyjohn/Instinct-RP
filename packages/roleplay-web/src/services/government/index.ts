import {GovernmentService} from './Government.types';
import {GovernmentServiceMock} from './Government.mock';
import {GovernmentServiceImplementation} from './Government';

export const governmentService: GovernmentService =
  process.env.NODE_ENV !== 'test'
    ? new GovernmentServiceImplementation()
    : new GovernmentServiceMock();
