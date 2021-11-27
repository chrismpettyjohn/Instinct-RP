import {FoodPipe} from './food.pipe';
import {Module} from '@nestjs/common';
import {FoodController} from './food.controller';
import {DatabaseModule} from '../database/database.module';
import {SessionModule} from '../session/session.module';

@Module({
  imports: [DatabaseModule, SessionModule],
  controllers: [FoodController],
  providers: [FoodPipe],
  exports: [FoodPipe],
})
export class FoodModule {}
