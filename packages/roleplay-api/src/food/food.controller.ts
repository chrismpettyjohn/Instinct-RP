import {FoodPipe} from './food.pipe';
import {FoodDTOImplementation} from './food.dto';
import {HasSession} from '@instinct-api/session';
import {foodWire} from '../database/food/food.wire';
import {Food} from '@instinct-plugin/roleplay-types';
import {FoodRepository} from '../database/food/food.repository';
import {HasRPScope} from '../session/permission-scope.decorator';
import {FoodEntity, FoodServable} from '../database/food/food.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('food')
@HasSession()
export class FoodController {
  constructor(private readonly foodRepo: FoodRepository) {}

  @Post()
  @HasRPScope('websiteManageFood')
  async createFood(@Body() foodDTO: FoodDTOImplementation): Promise<Food> {
    const newFood = await this.foodRepo.create({
      ...foodDTO,
      servable: foodDTO.servable ? FoodServable.Yes : FoodServable.No,
    });
    return foodWire(newFood);
  }

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

  @Patch(':foodID')
  @HasRPScope('websiteManageFood')
  async updateFoodByID(
    @Param('foodID', FoodPipe) food: FoodEntity,
    @Body() foodDTO: FoodDTOImplementation
  ) {
    await this.foodRepo.update(
      {id: food.id!},
      {
        ...foodDTO,
        servable: foodDTO.servable ? FoodServable.Yes : FoodServable.No,
      }
    );
  }

  @Delete(':foodID')
  @HasRPScope('websiteManageFood')
  async deleteFoodByID(@Param('foodID', FoodPipe) food: FoodEntity) {
    await this.foodRepo.delete({id: food.id!});
  }
}
