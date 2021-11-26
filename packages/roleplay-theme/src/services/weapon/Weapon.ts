import {AxiosResponse} from 'axios';
import {WeaponService} from './Weapon.types';
import {backendAPI} from '@instinct-web/core';
import {Weapon} from '@instinct-plugin/roleplay-types';

export class WeaponServiceImplementation implements WeaponService {
  async getAll() {
    const weapons: AxiosResponse<Weapon[]> = await backendAPI.get('weapon');
    return weapons.data;
  }

  async getByID(weaponID: string) {
    const weapon: AxiosResponse<Weapon> = await backendAPI.get(
      `weapon/${weaponID}`
    );
    return weapon.data;
  }
}
