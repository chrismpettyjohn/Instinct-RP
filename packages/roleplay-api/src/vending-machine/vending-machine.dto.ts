import {IsString, IsNumber} from 'class-validator';
import {VendingMachineDTO} from '@instinct-plugin/roleplay-types';

export class VendingMachineDTOImplementation implements VendingMachineDTO {
  @IsString()
  name!: string;

  @IsString()
  itemName!: string;

  @IsNumber()
  cost!: number;

  @IsNumber()
  hungerRestored!: number;

  @IsNumber()
  energyGained!: number;

  @IsNumber()
  healthGained!: number;
}
