import React, {useState} from 'react';
import {businessEditorContext} from './BusinessEditor';
import {
  Business,
  BusinessDTO,
  BusinessPositionDTO,
  exampleBusinessDTO,
} from '@instinct-plugin/roleplay-types';
import {BusinessEditorContextProviderProps} from './BusinessEditor.types';

export function BusinessEditorProvider({
  children,
  defaultBusiness,
}: BusinessEditorContextProviderProps) {
  const [business, setBusinessState] = useState(
    defaultBusiness ?? exampleBusinessDTO
  );

  function setBusiness<K extends keyof Omit<BusinessDTO, 'permissions'>>(
    key: K,
    value: Omit<BusinessDTO, 'permissions'>[K]
  ) {
    setBusinessState(_ => ({
      ..._,
      [key]: value,
    }));
  }

  function addPosition(position: BusinessPositionDTO) {
    setBusinessState(_ => ({
      ..._,
      positions: [..._.positions, position],
    }));
  }

  function delPosition(index: number) {
    setBusinessState(_ => ({
      ..._,
      positions: _.positions.filter((pos, i) => i !== index),
    }));
  }

  function editPosition<K extends keyof BusinessPositionDTO>(
    index: number,
    key: K,
    value: BusinessPositionDTO[K]
  ) {
    setBusinessState(_ => {
      const newPositions = [..._.positions];
      newPositions[index][key] = value;
      return {
        ..._,
        positions: newPositions,
      };
    });
  }

  function movePositionUp(order: number) {
    setBusinessState(_ => {
      const newPositions = [..._.positions];
      const positionIndex = newPositions.findIndex(
        (pos: any) => pos.order === order
      )!;

      if (positionIndex > 1) {
        newPositions[positionIndex].order =
          newPositions[positionIndex].order - 1;
      }

      return {
        ..._,
        positions: newPositions,
      };
    });
  }

  function movePositionDown(order: number) {
    setBusinessState(_ => {
      const newPositions = [..._.positions];
      const positionIndex = newPositions.findIndex(
        (pos: any) => pos.order === order
      )!;

      if (positionIndex < newPositions.length - 1) {
        newPositions[positionIndex].order =
          newPositions[positionIndex].order + 1;
      }

      return {
        ..._,
        positions: newPositions,
      };
    });
  }

  return (
    <businessEditorContext.Provider
      value={{
        business,
        setBusiness,
        addPosition,
        delPosition,
        editPosition,
        movePositionUp,
        movePositionDown,
      }}
    >
      {children}
    </businessEditorContext.Provider>
  );
}
