import {Food} from './Food';

export type FoodDTO = Omit<Food, 'id'>;
