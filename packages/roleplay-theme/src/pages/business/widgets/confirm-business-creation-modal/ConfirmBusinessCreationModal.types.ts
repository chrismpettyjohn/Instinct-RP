import {BusinessDTO} from '@instinct-plugin/roleplay-types';

export interface ConfirmBusinessCreationModalProps {
  businessDTO: BusinessDTO;
  isOpen: boolean;
  onToggle(): void;
}
