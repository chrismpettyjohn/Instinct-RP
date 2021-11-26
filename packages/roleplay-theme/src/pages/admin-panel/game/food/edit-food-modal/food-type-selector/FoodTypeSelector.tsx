import React from 'react';
import {Icon} from '@instinct-web/core';
import {FoodType} from '@instinct-plugin/roleplay-types';
import {FoodTypeSelectorProps} from './FoodTypeSelector.types';

export function FoodTypeSelector({foodType, onChange}: FoodTypeSelectorProps) {
  function getFoodType(icon: string, label: string, key: FoodType) {
    return (
      <div className="col-6 text-center">
        <div
          className="bg-dark p-4 w-100"
          style={{
            border: '1px solid transparent',
            borderColor: foodType === key ? 'white' : 'transparent',
            borderRadius: 4,
            cursor: 'pointer',
          }}
          onClick={() => onChange(key)}
        >
          <Icon type={icon} />
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="row p-4">
      {getFoodType('coffee', 'Drink', FoodType.Drink)}
      {getFoodType('drumstick', 'Food', FoodType.Food)}
    </div>
  );
}
