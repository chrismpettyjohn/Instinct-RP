export interface Weapon {
  id: number;
  name: string;
  itemName: string;
  damageText: string;
  equipText: string;
  unequipText: string;
  reloadText: string;
  killText: string;
  energyUsed: number;
  effectID?: number;
  handItem?: number;
  range: number;
  cooldownTime: number;
  minDamage: number;
  maxDamage: number;
  cost: number;
  weaponEffect: string;
  wDamageText: string;
  wKillText: string;
  reloadTime: number;
  clipSize: number;
  rank: number;
}

export const exampleWeapon: Weapon = {
  id: 1,
  name: '',
  itemName: '',
  damageText: '',
  equipText: '',
  unequipText: '',
  reloadText: '',
  killText: '',
  energyUsed: 0,
  effectID: 0,
  handItem: 0,
  range: 0,
  cooldownTime: 0,
  minDamage: 10,
  maxDamage: 30,
  cost: 0,
  weaponEffect: '',
  wDamageText: '',
  wKillText: '',
  reloadTime: 0,
  clipSize: 0,
  rank: 0,
};
