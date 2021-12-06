import {createFetchHook} from '@instinct-web/core';
import {businessService} from '../../services/business';
import {BusinessPosition} from '@instinct-plugin/roleplay-types';

export const useFetchOpenPositions = () =>
  createFetchHook<BusinessPosition[]>(businessService.getOpenPositions);
