import {Weapon} from './Weapon';

export type WeaponDTO = Omit<Weapon, 'id'>;
