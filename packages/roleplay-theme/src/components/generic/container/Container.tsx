import React from 'react';
import {ContainerProps} from './index';

export function Container({children, style}: ContainerProps) {
  return (
    <div className="page-content" style={style}>
      {children}
    </div>
  );
}
