import {AxiosResponse} from 'axios';
import {GuideService} from './Guide.types';
import {backendAPI} from '@instinct-web/core';
import {Guide, GuideDTO, GuideReaction} from '@instinct-plugin/roleplay-types';

export class GuideServiceImplementation implements GuideService {
  async getAll() {
    const guides: AxiosResponse<Guide[]> = await backendAPI.get('guides');
    return guides.data;
  }

  async getByID(guideID: string) {
    const guide: AxiosResponse<Guide> = await backendAPI.get(
      `guides/${guideID}`
    );
    return guide.data;
  }

  async create(guideDTO: GuideDTO) {
    const newGuide: AxiosResponse<Guide> = await backendAPI.post(
      'guides',
      guideDTO
    );
    return newGuide.data;
  }

  async updateByID(guideID: string, guideDTO: GuideDTO) {
    await backendAPI.patch(`guides/${guideID}`, guideDTO);
  }

  async deleteByID(guideID: string) {
    await backendAPI.delete(`guides/${guideID}`);
  }

  async reactByID(guideID: string, reaction: GuideReaction): Promise<void> {
    await backendAPI.put(`guides/${guideID}/reactions/${reaction}`);
  }
}
