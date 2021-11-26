import {Gang} from '@instinct-plugin/roleplay-types';
import {gangService} from '@instinct-plugin/roleplay-web';
import {createFetchHook} from '@instinct-web/core';

export const useFetchAllGangs = () =>
  createFetchHook<Gang[]>(gangService.getAll);
