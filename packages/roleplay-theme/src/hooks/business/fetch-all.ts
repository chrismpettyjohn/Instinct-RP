import {Business} from '@instinct-plugin/roleplay-types';
import {createFetchHook} from '@instinct-web/core';
import {businessService} from '../../services/business';

export const useFetchAllBusinesses = () =>
  createFetchHook<Business[]>(businessService.getAll);
