import {Food} from '@instinct-plugin/roleplay-types';
import {FoodEntity, FoodServable} from './food.entity';

export function foodWire(entity: FoodEntity): Food {
  return {
    id: entity.id!,
    name: entity.name,
    type: entity.type,
    itemID: entity.itemID,
    extraData: entity.extraData,
    cost: entity.cost,
    healthGained: entity.healthGained,
    energyGained: entity.energyGained,
    hungerRestored: entity.hungerRestored,
    serveText: entity.serveText,
    eatText: entity.eatText,
    servable: entity.servable === FoodServable.Yes,
  };
}
