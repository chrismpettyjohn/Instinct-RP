import {Children} from '@instinct-web/core';

export interface ModalOverlayProps {
  children: Children;
  header?: string;
  isOpen: boolean;
  onToggle?: () => void;
}
