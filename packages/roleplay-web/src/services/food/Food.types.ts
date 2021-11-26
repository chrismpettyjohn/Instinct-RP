import {Food, FoodDTO} from '@instinct-plugin/roleplay-types';

export interface FoodService {
  create(foodDTO: FoodDTO): Promise<Food>;
  getAll(): Promise<Food[]>;
  getByID(foodID: string): Promise<Food>;
  updateByID(foodID: string, foodDTO: FoodDTO): Promise<void>;
  deleteByID(foodID: string): Promise<void>;
}
