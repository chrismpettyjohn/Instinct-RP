import {createFetchHook} from '@instinct-web/core';
import {BusinessPosition} from '@instinct-plugin/roleplay-types';
import {governmentService} from '@instinct-plugin/roleplay-web';

export const useFetchGovPositions = () =>
  createFetchHook<BusinessPosition[]>(governmentService.getAll);
