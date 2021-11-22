import {GuideService} from './Guide.types';
import {GuideServiceMock} from './Guide.mock';
import {GuideServiceImplementation} from './Guide';

export const guideService: GuideService =
  process.env.NODE_ENV !== 'test'
    ? new GuideServiceImplementation()
    : new GuideServiceMock();
