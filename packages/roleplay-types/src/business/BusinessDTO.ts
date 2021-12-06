import {BusinessType} from './Business';

export interface BusinessDTO {
  name: string;
  desc: string;
  type: BusinessType;
  badge: string;
  homeRoom: number;
  investment: number;
  positions: BusinessPositionDTO[];
}

export type UpdateBusinessDTO = Partial<Omit<BusinessDTO, 'positions'>>;

export interface BusinessPositionDTO {
  id?: number;
  order: number;
  name: string;
  maleUniform: string;
  femaleUniform: string;
  shiftWage: number;
  openPositions: number;
}

export const exampleBusinessPositionDTO: BusinessPositionDTO = {
  id: undefined,
  order: 1,
  name: '',
  maleUniform: '',
  femaleUniform: '',
  shiftWage: 25,
  openPositions: 0,
};

export const exampleBusinessDTO: BusinessDTO = {
  name: '',
  desc: '',
  type: BusinessType.Store,
  badge: 'BGWV7',
  homeRoom: 0,
  investment: 100,
  positions: [],
};
