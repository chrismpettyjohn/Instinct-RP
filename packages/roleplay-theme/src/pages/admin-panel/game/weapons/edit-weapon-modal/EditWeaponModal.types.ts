import {Weapon} from '@instinct-plugin/roleplay-types';

export interface EditWeaponModalProps {
  weapon: Weapon;
  onChange(): void;
}
