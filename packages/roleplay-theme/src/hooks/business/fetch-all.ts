import {Business} from '@instinct-plugin/roleplay-types';
import {createFetchHook} from '@instinct-web/core';
import {businessService} from '@instinct-plugin/roleplay-web';

export const useFetchAllBusinesses = () =>
  createFetchHook<Business[]>(businessService.getAll);
