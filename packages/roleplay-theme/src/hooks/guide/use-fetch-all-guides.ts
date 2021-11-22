import {guideService} from '../../services/guide';
import {createFetchHook} from '@instinct-web/core';
import {Guide} from '@instinct-plugin/roleplay-types';

export const useFetchAllGuides = () =>
  createFetchHook<Guide[]>(guideService.getAll);
