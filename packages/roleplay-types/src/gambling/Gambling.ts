export interface GamblingMachine {
  id: number;
  name: string;
  type: string;
  minimumBet: number;
  maximumBet: number;
  multiplier: number;
  itemID: number;
}

export const exampleGamblingMachine: GamblingMachine = {
  id: 1,
  name: 'Slots',
  type: 'slots',
  minimumBet: 5,
  maximumBet: 100,
  multiplier: 1,
  itemID: 0,
};
