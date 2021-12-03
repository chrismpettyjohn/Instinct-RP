import {createFetchHook} from '@instinct-web/core';
import {Property} from '@instinct-plugin/roleplay-types';
import {propertyService} from '../../services/property';

export const useFetchAllPropertys = (refresh = 0) =>
  createFetchHook<Property[]>(propertyService.getAll, refresh);
