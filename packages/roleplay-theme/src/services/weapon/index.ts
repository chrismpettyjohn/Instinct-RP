import {WeaponService} from './Weapon.types';
import {WeaponServiceMock} from './Weapon.mock';
import {WeaponServiceImplementation} from './Weapon';

export const weaponService: WeaponService =
  process.env.NODE_ENV !== 'test'
    ? new WeaponServiceImplementation()
    : new WeaponServiceMock();
