import {Weapon} from '@instinct-plugin/roleplay-types';

export interface WeaponService {
  getAll(): Promise<Weapon[]>;
  getByID(weaponID: string): Promise<Weapon>;
}
