import {Weapon} from '@instinct-plugin/roleplay-types';
import {weaponService} from '../../services/weapon';
import {createFetchHook} from '@instinct-web/core';

export const useFetchAllWeapons = () =>
  createFetchHook<Weapon[]>(weaponService.getAll);
