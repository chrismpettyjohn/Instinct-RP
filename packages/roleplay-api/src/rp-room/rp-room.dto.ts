import {RPRoomDTO} from '@instinct-plugin/roleplay-types';
import {IsBoolean, IsString, IsNumber} from 'class-validator';

export class RPRoomDTOImplementation implements RPRoomDTO {
  @IsBoolean()
  bankEnabled!: boolean;

  @IsBoolean()
  casinoEnabled!: boolean;

  @IsBoolean()
  meleeEnabled!: boolean;

  @IsBoolean()
  shootEnabled!: boolean;

  @IsBoolean()
  bombEnabled!: boolean;

  @IsBoolean()
  hitEnabled!: boolean;

  @IsBoolean()
  magicEnabled!: boolean;

  @IsBoolean()
  robEnabled!: boolean;

  @IsBoolean()
  daylightEnabled!: boolean;

  @IsBoolean()
  turfEnabled!: boolean;

  @IsBoolean()
  hospitalEnabled!: boolean;

  @IsBoolean()
  safezoneEnabled!: boolean;

  @IsBoolean()
  mwEnabled!: boolean;

  @IsBoolean()
  gymEnabled!: boolean;

  @IsBoolean()
  taxiToEnabled!: boolean;

  @IsBoolean()
  taxiFromEnabled!: boolean;

  @IsString()
  enterMessage!: string;

  @IsNumber()
  openTime!: number;

  @IsNumber()
  closeTime!: number;
}
