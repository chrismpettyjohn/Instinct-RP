import {GuideService} from './Guide.types';
import {exampleGuide, GuideDTO} from '@instinct-plugin/roleplay-types';

export class GuideServiceMock implements GuideService {
  async getAll() {
    return [exampleGuide];
  }

  async create(guideDTO: GuideDTO) {
    return exampleGuide;
  }

  async getByID(guideID: string) {
    return exampleGuide;
  }

  async updateByID(guideID: string, guideDTO: GuideDTO) {}

  async deleteByID(guideID: string) {}

  async reactByID(guideID: string) {}
}
