import {CrimeDTO} from '@instinct-plugin/roleplay-types';
import {IsBoolean, IsString, IsNumber} from 'class-validator';

export class CrimeDTOImplementation implements CrimeDTO {
  @IsString()
  name!: string;

  @IsString()
  aliases!: string;

  @IsString()
  description!: string;

  @IsNumber()
  jailTimeInMinutes!: number;

  @IsBoolean()
  ticketable!: boolean;

  @IsNumber()
  ticketCost!: number;

  @IsBoolean()
  stackable!: boolean;
}
