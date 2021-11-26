import {FoodDTO, FoodType} from '@instinct-plugin/roleplay-types';
import {IsString, IsBoolean, IsEnum, IsNumber} from 'class-validator';

export class FoodDTOImplementation implements FoodDTO {
  @IsString()
  name!: string;

  @IsEnum(FoodType)
  type!: FoodType;

  @IsNumber()
  itemID!: number;

  @IsString()
  extraData!: string;

  @IsNumber()
  cost!: number;

  @IsNumber()
  healthGained!: number;

  @IsNumber()
  energyGained!: number;

  @IsNumber()
  hungerRestored!: number;

  @IsNumber()
  serveText!: string;

  @IsString()
  eatText!: string;

  @IsBoolean()
  servable!: boolean;
}
