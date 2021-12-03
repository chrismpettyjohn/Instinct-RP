import {PropertyService} from './Property.types';
import {PropertyServiceMock} from './Property.mock';
import {PropertyServiceImplementation} from './Property';

export const propertyService: PropertyService =
  process.env.NODE_ENV !== 'test'
    ? new PropertyServiceImplementation()
    : new PropertyServiceMock();
