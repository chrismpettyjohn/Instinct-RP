import {AxiosResponse} from 'axios';
import {FoodService} from './Food.types';
import {backendAPI} from '@instinct-web/core';
import {Food, FoodDTO} from '@instinct-plugin/roleplay-types';

export class FoodServiceImplementation implements FoodService {
  async create(foodDTO: FoodDTO) {
    const newFood: AxiosResponse<Food> = await backendAPI.post('food', foodDTO);
    return newFood.data;
  }

  async getAll() {
    const foods: AxiosResponse<Food[]> = await backendAPI.get('food');
    return foods.data;
  }

  async getByID(foodID: string) {
    const food: AxiosResponse<Food> = await backendAPI.get(`food/${foodID}`);
    return food.data;
  }

  async updateByID(foodID: string, foodDTO: FoodDTO) {
    await backendAPI.patch(`food/${foodID}`, foodDTO);
  }

  async deleteByID(foodID: string) {
    await backendAPI.delete(`food/${foodID}`);
  }
}
