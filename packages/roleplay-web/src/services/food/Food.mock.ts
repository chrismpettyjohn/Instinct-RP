import {FoodService} from './Food.types';
import {exampleFood, FoodDTO} from '@instinct-plugin/roleplay-types';

export class FoodServiceMock implements FoodService {
  async create(foodDTO: FoodDTO) {
    return exampleFood;
  }

  async getAll() {
    return [exampleFood];
  }

  async getByID(foodID: string) {
    return exampleFood;
  }

  async updateByID(foodID: string, foodDTO: FoodDTO) {}

  async deleteByID(foodID: string) {}
}
