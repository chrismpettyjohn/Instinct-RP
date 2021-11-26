import {WeaponService} from './Weapon.types';
import {exampleWeapon} from '@instinct-plugin/roleplay-types';

export class WeaponServiceMock implements WeaponService {
  async getAll() {
    return [exampleWeapon];
  }

  async getByID(weaponID: string) {
    return exampleWeapon;
  }
}
