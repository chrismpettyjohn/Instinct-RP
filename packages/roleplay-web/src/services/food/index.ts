import {FoodService} from './Food.types';
import {FoodServiceMock} from './Food.mock';
import {FoodServiceImplementation} from './Food';

export const foodService: FoodService =
  process.env.NODE_ENV !== 'test'
    ? new FoodServiceImplementation()
    : new FoodServiceMock();
