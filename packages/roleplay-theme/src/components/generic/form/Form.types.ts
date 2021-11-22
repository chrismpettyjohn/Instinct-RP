import {Children} from '@instinct-web/core';

export interface FormProps {
  className?: string;
  children: Children;
  disabled?: boolean;
  onSubmit?: () => void;
}
