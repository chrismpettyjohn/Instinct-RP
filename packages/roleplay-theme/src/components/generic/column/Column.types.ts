import {Children} from '@instinct-web/core';

export interface ColumnProps {
  children: Children;
  side: 'left' | 'right';
  style?: object;
}
