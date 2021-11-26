import {FoodPipe} from './food.pipe';
import {Module} from '@nestjs/common';
import {FoodController} from './food.controller';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FoodController],
  providers: [FoodPipe],
  exports: [FoodPipe],
})
export class FoodModule {}
