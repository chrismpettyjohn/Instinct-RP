import {GamblingMachineEntity} from './gambling.entity';
import {GamblingMachine} from '@instinct-plugin/roleplay-types';

export function gamblingMachineWire(
  entity: GamblingMachineEntity
): GamblingMachine {
  return {
    id: entity.id!,
    name: entity.name,
    type: entity.type,
    minimumBet: entity.minimumBet,
    maximumBet: entity.maximumBet,
    multiplier: entity.multiplier,
    itemID: entity.itemID,
  };
}
