import {BackgroundColor, PrimaryColor, Children} from '@instinct-web/core';

export interface CardProps {
  bg?: BackgroundColor;
  color?: PrimaryColor;
  className?: string;
  header?: Children;
  children: Children;
  icon?: string;
  style?: object;
}
