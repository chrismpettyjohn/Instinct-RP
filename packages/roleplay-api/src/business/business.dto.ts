import {
  IsBoolean,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsObject,
  IsEnum,
} from 'class-validator';
import {
  BusinessType,
  BusinessDTO as BusinessDTOI,
  BusinessPositionDTO as BusinessPositionDTOI,
} from '@instinct-plugin/roleplay-types';

export class BusinessDTO implements BusinessDTOI {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  desc!: string;

  @IsEnum(BusinessType)
  type!: BusinessType;

  @IsString()
  @IsNotEmpty()
  badge!: string;

  @IsNumber()
  homeRoom!: number;

  @IsNumber()
  investment!: number;

  @IsObject({each: true})
  positions!: BusinessPositionDTO[];
}

class BusinessPositionDTO implements BusinessPositionDTOI {
  @IsNumber()
  order!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  maleUniform!: string;

  @IsString()
  @IsNotEmpty()
  femaleUniform!: string;

  @IsNumber()
  shiftWage!: number;

  @IsNumber()
  shiftTime!: number;

  @IsNumber()
  openPositions!: number;
}
