import {IsBoolean, IsNumber} from 'class-validator';
import {
  PropertyDTO,
  BidOnPropertyDTO,
  RespondOnPropertyBidDTO,
  PropertyPhotoDTO,
} from '@instinct-plugin/roleplay-types';

export class PropertyDTOImplementation implements PropertyDTO {
  @IsNumber()
  roomID!: number;

  @IsNumber({}, {each: true})
  photoIDs!: number[];

  @IsNumber()
  buyNowPrice!: number;
}

export class BidOnPropertyDTOImplementation implements BidOnPropertyDTO {
  @IsNumber()
  offer!: number;
}

export class RespondOnPropertyBidDTOImplementation
  implements RespondOnPropertyBidDTO
{
  @IsBoolean()
  accepted!: boolean;
}

export class PropertyPhotoDTOImplementation implements PropertyPhotoDTO {
  @IsNumber()
  photoID!: number;

  @IsBoolean()
  isPrimary!: boolean;
}
