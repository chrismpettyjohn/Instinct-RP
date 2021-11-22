import {ReactNode} from 'react';
import {Children} from '@instinct-web/core';

export interface NavBarDropdownProps {
  children: Children;
  to: string;
  text: ReactNode;
}
