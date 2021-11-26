import {GamblingMachine} from '@instinct-plugin/roleplay-types';

export interface EditGamblingModalProps {
  gamblingMachine: GamblingMachine;
  onChange(): void;
}
