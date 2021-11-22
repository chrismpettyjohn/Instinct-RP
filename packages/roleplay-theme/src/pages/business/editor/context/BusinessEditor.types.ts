import {
  BusinessDTO,
  BusinessPositionDTO,
  exampleBusinessDTO,
} from '@instinct-plugin/roleplay-types';
import {ReactNode} from 'react';

export interface BusinessEditorContext {
  business: BusinessDTO;
  setBusiness<K extends keyof Omit<BusinessDTO, 'positions'>>(
    key: K,
    value: Omit<BusinessDTO, 'positions'>[K]
  ): void;
  addPosition(position: BusinessPositionDTO): void;
  delPosition(index: number): void;
  editPosition<K extends keyof BusinessPositionDTO>(
    index: number,
    key: K,
    value: BusinessPositionDTO[K]
  ): void;
  movePositionUp(index: number): void;
  movePositionDown(index: number): void;
}

export const defaultBusinessEditorContext: BusinessEditorContext = {
  business: exampleBusinessDTO,
  setBusiness<K extends keyof Omit<BusinessDTO, 'positions'>>(
    key: K,
    value: Omit<BusinessDTO, 'positions'>[K]
  ) {},
  addPosition(position: BusinessPositionDTO) {},
  delPosition(index: number) {},
  editPosition<K extends keyof BusinessPositionDTO>(
    index: number,
    key: K,
    value: BusinessPositionDTO[K]
  ) {},
  movePositionDown(index: number) {
  },
  movePositionUp(index: number) {
  }
};

export interface BusinessEditorContextProviderProps {
  children: ReactNode;
  defaultBusiness?: BusinessDTO;
}
