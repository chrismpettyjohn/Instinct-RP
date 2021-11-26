import {FoodPipe} from './food.pipe';
import {HasSession} from '@instinct-api/session';
import {foodWire} from '../database/food/food.wire';
import {Food} from '@instinct-plugin/roleplay-types';
import {Controller, Get, Param} from '@nestjs/common';
import {FoodEntity} from '../database/food/food.entity';
import {FoodRepository} from '../database/food/food.repository';

@Controller('food')
@HasSession()
export class FoodController {
  constructor(private readonly foodRepo: FoodRepository) {}

  @Get()
  async getFoods(): Promise<Food[]> {
    const foodOptions = await this.foodRepo.find();
    return foodOptions.map(foodWire);
  }

  @Get(':foodID')
  async getFoodByID(
    @Param('foodID', FoodPipe) food: FoodEntity
  ): Promise<Food> {
    return foodWire(food);
  }
}
