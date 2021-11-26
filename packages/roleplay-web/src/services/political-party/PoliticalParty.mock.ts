import {PoliticalPartyService} from './PoliticalParty.types';
import {
  examplePoliticalParty,
  PoliticalPartyDTO,
} from '@instinct-plugin/roleplay-types';

export class PoliticalPartyMockImplementation implements PoliticalPartyService {
  async getAll() {
    return [examplePoliticalParty];
  }

  async create(politicalPartyDTO: PoliticalPartyDTO) {
    return examplePoliticalParty;
  }

  async getByID(politicalPartyID: number) {
    return examplePoliticalParty;
  }

  async updateByID(
    politicalPartyID: number,
    politicalPartyDTO: PoliticalPartyDTO
  ) {}

  async deleteByID(politicalPartyID: number) {}

  async joinByID(politicalPartyID: number) {}

  async leaveByID(politicalPartyID: number) {}
}
