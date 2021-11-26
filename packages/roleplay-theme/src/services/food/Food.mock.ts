import {FoodService} from './Food.types';
import {exampleFood} from '@instinct-plugin/roleplay-types';

export class FoodServiceMock implements FoodService {
  async getAll() {
    return [exampleFood];
  }

  async getByID(foodID: string) {
    return exampleFood;
  }
}
