export interface VendingMachine {
  id: number;
  name: string;
  itemName: string;
  cost: number;
  hungerRestored: number;
  energyGained: number;
  healthGained: number;
}

export const exampleVendingMachine: VendingMachine = {
  id: 0,
  name: '',
  itemName: '',
  cost: 1,
  hungerRestored: 1,
  energyGained: 1,
  healthGained: 1,
};
