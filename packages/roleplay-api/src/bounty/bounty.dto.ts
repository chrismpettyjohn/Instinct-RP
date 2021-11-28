import {IsNumber} from 'class-validator';
import {BountyDTO} from '@instinct-plugin/roleplay-types';

export class BountyDTOImplementation implements BountyDTO {
  @IsNumber()
  targetUserID!: number;

  @IsNumber()
  reward!: number;

  @IsNumber()
  expiresAt!: number;
}
