import {Food} from '@instinct-plugin/roleplay-types';
import {foodService} from '../../services/food';
import {createFetchHook} from '@instinct-web/core';

export const useFetchAllFood = () =>
  createFetchHook<Food[]>(foodService.getAll);
