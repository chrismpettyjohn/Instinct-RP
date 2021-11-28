import {AxiosResponse} from 'axios';
import {BountyService} from './Bounty.types';
import {backendAPI} from '@instinct-web/core';
import {Bounty, BountyDTO} from '@instinct-plugin/roleplay-types';

export class BountyServiceImplementation implements BountyService {
  async create(bountyDTO: BountyDTO) {
    const newBounty: AxiosResponse<Bounty> = await backendAPI.post(
      'bounties',
      bountyDTO
    );
    return newBounty.data;
  }

  async getAll() {
    const bountys: AxiosResponse<Bounty[]> = await backendAPI.get('bounties');
    return bountys.data;
  }

  async getByID(bountyID: string) {
    const bounty: AxiosResponse<Bounty> = await backendAPI.get(
      `bounties/${bountyID}`
    );
    return bounty.data;
  }

  async updateByID(bountyID: string, bountyDTO: BountyDTO) {
    await backendAPI.patch(`bounties/${bountyID}`, bountyDTO);
  }

  async deleteByID(bountyID: string) {
    await backendAPI.delete(`bounties/${bountyID}`);
  }
}
