import {Food} from '@instinct-plugin/roleplay-types';

export type FoodDTO = Omit<Food, 'id'>;
