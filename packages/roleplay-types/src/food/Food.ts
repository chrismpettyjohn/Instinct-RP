export enum FoodType {
  Food = 'food',
  Drink = 'drink',
}

export interface Food {
  id: number;
  name: string;
  type: FoodType;
  itemID: number;
  extraData: string;
  cost: number;
  healthGained: number;
  energyGained: number;
  hungerRestored: number;
  serveText: string;
  eatText: string;
  servable: boolean;
}

export const exampleFood: Food = {
  id: 1,
  name: 'Chicken',
  type: FoodType.Food,
  itemID: 0,
  extraData: '',
  cost: 1,
  healthGained: 1,
  energyGained: 1,
  hungerRestored: 1,
  serveText: '',
  eatText: '',
  servable: false,
};
