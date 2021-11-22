import React from 'react';
import {IconProps} from './Icon.types';

export function Icon({
  className = 'mr-2',
  family = 'fas',
  type,
  onClick,
  style,
}: IconProps) {
  return (
    <i
      className={`${family} fa-${type} ${className}`}
      onClick={onClick}
      style={style}
    />
  );
}
