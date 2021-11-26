import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {BusinessService} from './Business.types';
import {Business, BusinessDTO} from '@instinct-plugin/roleplay-types';

export class BusinessServiceImplementation implements BusinessService {
  async create(businessDTO: BusinessDTO) {
    const newBusiness: AxiosResponse<Business> = await backendAPI.post(
      'businesses',
      businessDTO
    );
    return newBusiness.data;
  }

  async getAll() {
    const businesses: AxiosResponse<Business[]> = await backendAPI.get(
      'businesses'
    );
    return businesses.data;
  }

  async getByID(businessID: string) {
    const business: AxiosResponse<Business> = await backendAPI.get(
      `businesses/${businessID}`
    );
    return business.data;
  }

  async delete(businessID: string) {
    await backendAPI.delete(`businesses/${businessID}`);
  }
}
