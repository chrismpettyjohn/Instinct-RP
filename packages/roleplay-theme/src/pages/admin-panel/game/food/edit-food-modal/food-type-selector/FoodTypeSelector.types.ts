import {FoodType} from '@instinct-plugin/roleplay-types';

export interface FoodTypeSelectorProps {
  foodType: FoodType;
  onChange(newFoodType: FoodType): void;
}
