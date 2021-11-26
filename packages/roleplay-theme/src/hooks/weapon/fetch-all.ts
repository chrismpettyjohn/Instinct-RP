import {Weapon} from '@instinct-plugin/roleplay-types';
import {weaponService} from '../../services/weapon';
import {createFetchHook} from '@instinct-web/core';

export const useFetchAllWeapons = (refresh = 0) =>
  createFetchHook<Weapon[]>(weaponService.getAll, refresh);
