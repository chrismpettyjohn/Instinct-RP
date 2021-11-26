import {Food} from '@instinct-plugin/roleplay-types';

export interface EditFoodModalProps {
  food: Food;
  onChange(): void;
}
