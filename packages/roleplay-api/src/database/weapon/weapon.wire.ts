import {WeaponEntity} from './weapon.entity';
import {Weapon} from '@instinct-plugin/roleplay-types';

export function weaponWire(entity: WeaponEntity): Weapon {
  return {
    id: entity.id!,
    name: entity.name,
    itemName: entity.itemName,
    damageText: entity.damageText,
    equipText: entity.equipText,
    unequipText: entity.unequipText,
    reloadText: entity.reloadText,
    killText: entity.killText,
    energyUsed: entity.energyUsed,
    effectID: entity.effectID,
    handItem: entity.handItem,
    range: entity.range,
    cooldownTime: entity.cooldown,
    minDamage: Number(entity.damage.split(';')[0]),
    maxDamage: Number(entity.damage.split(';')[1]),
    cost: entity.cost,
    weaponEffect: entity.weaponEffect,
    wDamageText: entity.wDamageText,
    wKillText: entity.wKillText,
    reloadTime: entity.reloadTime,
    clipSize: entity.clipSize,
    rank: entity.rank,
  };
}
