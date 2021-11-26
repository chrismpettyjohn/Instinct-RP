import {AxiosResponse} from 'axios';
import {WeaponService} from './Weapon.types';
import {backendAPI} from '@instinct-web/core';
import {Weapon, WeaponDTO} from '@instinct-plugin/roleplay-types';

export class WeaponServiceImplementation implements WeaponService {
  async create(weaponDTO: WeaponDTO) {
    const weapon: AxiosResponse<Weapon> = await backendAPI.post(
      'weapons',
      weaponDTO
    );
    return weapon.data;
  }

  async getAll() {
    const weapons: AxiosResponse<Weapon[]> = await backendAPI.get('weapons');
    return weapons.data;
  }

  async getByID(weaponID: string) {
    const weapon: AxiosResponse<Weapon> = await backendAPI.get(
      `weapons/${weaponID}`
    );
    return weapon.data;
  }

  async updateByID(weaponID: string, weaponDTO: WeaponDTO) {
    await backendAPI.patch(`weapons/${weaponID}`, weaponDTO);
  }

  async deleteByID(weaponID: string) {
    await backendAPI.delete(`weapons/${weaponID}`);
  }
}
