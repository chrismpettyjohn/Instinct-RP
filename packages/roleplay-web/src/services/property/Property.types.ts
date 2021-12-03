import {
  BidOnPropertyDTO,
  Property,
  PropertyDTO,
  PropertyPhotoDTO,
  RespondOnPropertyBidDTO,
} from '@instinct-plugin/roleplay-types';

export interface PropertyService {
  create(propertyDTO: PropertyDTO): Promise<Property>;
  getAll(): Promise<Property[]>;
  getByID(propertyID: string): Promise<Property>;
  getByUsername(username: string): Promise<Property[]>;
  updateByID(propertyID: string, propertyDTO: PropertyDTO): Promise<void>;
  deleteByID(propertyID: string): Promise<void>;
  bidOnByID(
    propertyID: string,
    propertyBidDTO: BidOnPropertyDTO
  ): Promise<void>;
  respondToBidByID(
    propertyID: string,
    propertyBidID: string,
    propertyBidResponse: RespondOnPropertyBidDTO
  ): Promise<void>;
  addPhotoByID(
    propertyID: string,
    propertyPhotoDTO: PropertyPhotoDTO
  ): Promise<void>;
  updatePhotoByID(
    propertyID: string,
    photoID: string,
    propertyPhotoDTO: PropertyPhotoDTO
  ): Promise<void>;
  buyNowByID(propertyID: string): Promise<void>;
  deletePhotoByID(propertyID: string, photoID: string): Promise<void>;
}
