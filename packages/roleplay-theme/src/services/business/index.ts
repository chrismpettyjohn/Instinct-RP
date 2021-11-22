import {BusinessService} from './Business.types';
import {BusinessServiceMock} from './Business.mock';
import {BusinessServiceImplementation} from './Business';

export const businessService: BusinessService =
  process.env.NODE_ENV !== 'test'
    ? new BusinessServiceImplementation()
    : new BusinessServiceMock();
