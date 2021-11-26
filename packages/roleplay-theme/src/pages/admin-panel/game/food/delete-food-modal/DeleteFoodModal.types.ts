import {Food} from '@instinct-plugin/roleplay-types';

export interface DeleteFoodModalProps {
  food: Food;
  onDelete(): void;
}
