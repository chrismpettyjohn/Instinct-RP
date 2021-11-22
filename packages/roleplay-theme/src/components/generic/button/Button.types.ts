import {BackgroundColor, Children} from '@instinct-web/core';

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  color?: BackgroundColor;
  children: Children;
  style?: object;
  type?: 'button' | 'submit';
}
