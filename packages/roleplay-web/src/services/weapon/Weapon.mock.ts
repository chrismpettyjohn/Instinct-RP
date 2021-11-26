import {WeaponService} from './Weapon.types';
import {exampleWeapon, WeaponDTO} from '@instinct-plugin/roleplay-types';

export class WeaponServiceMock implements WeaponService {
  async create(weaponDTO: WeaponDTO) {
    return exampleWeapon;
  }

  async getAll() {
    return [exampleWeapon];
  }

  async getByID(weaponID: string) {
    return exampleWeapon;
  }

  async updateByID(weaponID: string, weaponDTO: WeaponDTO) {}

  async deleteByID(weaponID: string) {}
}
