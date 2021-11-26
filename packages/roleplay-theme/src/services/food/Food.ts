import {AxiosResponse} from 'axios';
import {FoodService} from './Food.types';
import {backendAPI} from '@instinct-web/core';
import {Food} from '@instinct-plugin/roleplay-types';

export class FoodServiceImplementation implements FoodService {
  async getAll() {
    const foods: AxiosResponse<Food[]> = await backendAPI.get('food');
    return foods.data;
  }

  async getByID(foodID: string) {
    const food: AxiosResponse<Food> = await backendAPI.get(`food/${foodID}`);
    return food.data;
  }
}
