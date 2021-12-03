import {AxiosResponse} from 'axios';
import {PropertyService} from './Property.types';
import {backendAPI} from '@instinct-web/core';
import {
  BidOnPropertyDTO,
  Property,
  PropertyDTO,
  PropertyPhotoDTO,
  RespondOnPropertyBidDTO,
} from '@instinct-plugin/roleplay-types';

export class PropertyServiceImplementation implements PropertyService {
  async create(propertyDTO: PropertyDTO) {
    const newProperty: AxiosResponse<Property> = await backendAPI.post(
      'properties',
      propertyDTO
    );
    return newProperty.data;
  }

  async getAll() {
    const properties: AxiosResponse<Property[]> = await backendAPI.get(
      'properties'
    );
    return properties.data;
  }

  async getByID(propertyID: string) {
    const property: AxiosResponse<Property> = await backendAPI.get(
      `properties/${propertyID}`
    );
    return property.data;
  }

  async getByUsername(username: string) {
    const properties: AxiosResponse<Property[]> = await backendAPI.get(
      `properties/by-user/${username}`
    );
    return properties.data;
  }

  async updateByID(propertyID: string, propertyDTO: PropertyDTO) {
    await backendAPI.patch(`properties/${propertyID}`, propertyDTO);
  }

  async deleteByID(propertyID: string) {
    await backendAPI.delete(`properties/${propertyID}`);
  }

  async bidOnByID(propertyID: string, propertyBidDTO: BidOnPropertyDTO) {
    await backendAPI.post(`properties/${propertyID}/bids`, propertyBidDTO);
  }

  async buyNowByID(propertyID: string) {
    await backendAPI.post(`properties/${propertyID}/bids/buy-now`);
  }

  async respondToBidByID(
    propertyID: string,
    propertyBidID: string,
    propertyBidResponse: RespondOnPropertyBidDTO
  ) {
    await backendAPI.post(
      `properties/${propertyID}/bids/${propertyBidID}/response`,
      propertyBidResponse
    );
  }

  async addPhotoByID(propertyID: string, propertyPhotoDTO: PropertyPhotoDTO) {
    await backendAPI.post(`properties/${propertyID}/photos`, propertyPhotoDTO);
  }

  async updatePhotoByID(
    propertyID: string,
    photoID: string,
    propertyPhotoDTO: PropertyPhotoDTO
  ) {
    await backendAPI.patch(
      `properties/${propertyID}/photos/${photoID}`,
      propertyPhotoDTO
    );
  }

  async deletePhotoByID(propertyID: string, photoID: string) {
    await backendAPI.delete(`properties/${propertyID}/photos/${photoID}`);
  }
}
