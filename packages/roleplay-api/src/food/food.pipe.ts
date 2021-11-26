import {FoodEntity} from '../database/food/food.entity';
import {FoodRepository} from '../database/food/food.repository';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class FoodPipe implements PipeTransform {
  constructor(private readonly foodRepo: FoodRepository) {}

  async transform(foodID: number): Promise<FoodEntity> {
    try {
      return await this.foodRepo.findOneOrFail({id: foodID});
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Food does not exist');
    }
  }
}
