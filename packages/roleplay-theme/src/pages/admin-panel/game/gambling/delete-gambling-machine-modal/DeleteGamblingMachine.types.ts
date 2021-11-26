import {GamblingMachine} from '@instinct-plugin/roleplay-types';

export interface DeleteGamblingMachineProps {
  gamblingMachine: GamblingMachine;
  onDelete(): void;
}
