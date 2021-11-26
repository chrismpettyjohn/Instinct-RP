import {IsString, IsNumber} from 'class-validator';
import {GamblingMachineDTO} from '@instinct-plugin/roleplay-types';

export class GamblingMachineDTOImplementation implements GamblingMachineDTO {
  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsNumber()
  minimumBet!: number;

  @IsNumber()
  maximumBet!: number;

  @IsNumber()
  multiplier!: number;

  @IsNumber()
  itemID!: number;
}
