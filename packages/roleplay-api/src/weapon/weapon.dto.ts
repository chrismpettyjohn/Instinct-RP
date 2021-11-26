import {WeaponDTO} from '@instinct-plugin/roleplay-types';
import {IsString, IsNumber, IsOptional} from 'class-validator';

export class WeaponDTOImplementation implements WeaponDTO {
  @IsString()
  name!: string;

  @IsString()
  itemName!: string;

  @IsString()
  damageText!: string;

  @IsString()
  equipText!: string;

  @IsString()
  unequipText!: string;

  @IsString()
  reloadText!: string;

  @IsString()
  killText!: string;

  @IsNumber()
  energyUsed!: number;

  @IsNumber()
  @IsOptional()
  effectID?: number;

  @IsNumber()
  @IsOptional()
  handItem?: number;

  @IsNumber()
  range!: number;

  @IsNumber()
  cooldownTime!: number;

  @IsNumber()
  minDamage!: number;

  @IsNumber()
  maxDamage!: number;

  @IsNumber()
  cost!: number;

  @IsString()
  weaponEffect!: string;

  @IsString()
  wDamageText!: string;

  @IsString()
  wKillText!: string;

  @IsString()
  reloadTime!: number;

  @IsNumber()
  clipSize!: number;

  @IsNumber()
  rank!: number;
}
