import React from 'react';
import {Icon} from '@instinct-web/core';
import {businessTypes} from '../BusinessTypes.const';
import {BusinessTypeOptionProps} from './BusinessTypeOption.types';

export function BusinessTypeOption({
  businessType,
  selected = false,
  onClick,
}: BusinessTypeOptionProps) {
  console.log(businessType);
  const businessTypeInfo = businessTypes.find(_ => _.value === businessType);

  return (
    <div
      className="p-4 text-center"
      style={{
        background: '#000B14',
        border: selected ? '1px solid white' : 'none',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Icon className="fa-3x mb-2" type={businessTypeInfo.icon} />
      <h3>{businessTypeInfo.label}</h3>
      <p>{businessTypeInfo.desc}</p>
    </div>
  );
}
