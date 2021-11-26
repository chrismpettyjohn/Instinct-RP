import {Food} from '@instinct-plugin/roleplay-types';

export interface FoodService {
  getAll(): Promise<Food[]>;
  getByID(foodID: string): Promise<Food>;
}
