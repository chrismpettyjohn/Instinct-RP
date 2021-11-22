import {IsString, IsNumber, IsNotEmpty} from 'class-validator';
import {UpdateBusinessDTO as UpdateBusinessDTOI} from '@instinct-plugin/roleplay-types';

export class UpdateBusinessDTO implements UpdateBusinessDTOI {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  desc!: string;

  @IsString()
  @IsNotEmpty()
  badge!: string;

  @IsNumber()
  homeRoom!: number;
}
