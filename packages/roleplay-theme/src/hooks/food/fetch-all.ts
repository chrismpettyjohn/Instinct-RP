import {Food} from '@instinct-plugin/roleplay-types';
import {foodService} from '../../services/food';
import {createFetchHook} from '@instinct-web/core';

export const useFetchAllFood = (refresh = 0) =>
  createFetchHook<Food[]>(foodService.getAll, refresh);
