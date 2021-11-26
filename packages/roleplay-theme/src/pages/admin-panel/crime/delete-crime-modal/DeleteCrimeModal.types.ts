import {Crime} from '@instinct-plugin/roleplay-types';

export interface DeleteCrimeModalProps {
  crime: Crime;
  onDelete(): void;
}
