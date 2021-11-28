import {BountyService} from './Bounty.types';
import {exampleBounty, BountyDTO} from '@instinct-plugin/roleplay-types';

export class BountyServiceMock implements BountyService {
  async create(bountyDTO: BountyDTO) {
    return exampleBounty;
  }

  async getAll() {
    return [exampleBounty];
  }

  async getByID(bountyID: string) {
    return exampleBounty;
  }

  async updateByID(bountyID: string, bountyDTO: BountyDTO) {}

  async deleteByID(bountyID: string) {}
}
