import {Crime} from '@instinct-plugin/roleplay-types';

export interface EditCrimeModalProps {
  crime: Crime;
  onChange(): void;
}
