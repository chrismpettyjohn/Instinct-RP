import {Weapon, WeaponDTO} from '@instinct-plugin/roleplay-types';

export interface WeaponService {
  create(weaponDTO: WeaponDTO): Promise<Weapon>;
  getAll(): Promise<Weapon[]>;
  getByID(weaponID: string): Promise<Weapon>;
  updateByID(weaponID: string, weaponDTO: WeaponDTO): Promise<void>;
  deleteByID(weaponID: string): Promise<void>;
}
