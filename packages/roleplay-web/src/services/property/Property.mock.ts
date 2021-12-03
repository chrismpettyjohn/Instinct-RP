import {PropertyService} from './Property.types';
import {
  BidOnPropertyDTO,
  exampleProperty,
  PropertyDTO,
  PropertyPhotoDTO,
  RespondOnPropertyBidDTO,
} from '@instinct-plugin/roleplay-types';

export class PropertyServiceMock implements PropertyService {
  async create(propertyDTO: PropertyDTO) {
    return exampleProperty;
  }

  async getAll() {
    return [exampleProperty];
  }

  async getByID(propertyID: string) {
    return exampleProperty;
  }

  async updateByID(propertyID: string, propertyDTO: PropertyDTO) {}

  async deleteByID(propertyID: string) {}

  async bidOnByID(propertyID: string, propertyBidDTO: BidOnPropertyDTO) {}

  async buyNowByID(propertyID: string) {}

  async respondToBidByID(
    propertyID: string,
    propertyBidID: string,
    propertyBidResponse: RespondOnPropertyBidDTO
  ) {}

  async addPhotoByID(propertyID: string, propertyPhotoDTO: PropertyPhotoDTO) {}

  async updatePhotoByID(
    propertyID: string,
    photoID: string,
    propertyPhotoDTO: PropertyPhotoDTO
  ) {}

  async deletePhotoByID(propertyID: string, photoID: string) {}
}
