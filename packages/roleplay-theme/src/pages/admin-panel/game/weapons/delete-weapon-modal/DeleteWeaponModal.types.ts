import {Weapon} from '@instinct-plugin/roleplay-types';

export interface DeleteWeaponModalProps {
  weapon: Weapon;
  onDelete(): void;
}
