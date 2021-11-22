import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {PoliticalPartyService} from './PoliticalParty.types';
import {
  PoliticalParty,
  PoliticalPartyDTO,
} from '@instinct-plugin/roleplay-types';

export class PoliticalPartyServiceImplementation
  implements PoliticalPartyService
{
  async getAll() {
    const politicalParties: AxiosResponse<PoliticalParty[]> =
      await backendAPI.get('political-parties');
    return politicalParties.data;
  }

  async getByID(politicalPartyID: number) {
    const politicalParty: AxiosResponse<PoliticalParty> = await backendAPI.get(
      `political-parties/${politicalPartyID}`
    );
    return politicalParty.data;
  }

  async create(politicalPartyDTO: PoliticalPartyDTO) {
    const newPoliticalParty: AxiosResponse<PoliticalParty> =
      await backendAPI.post('political-parties', politicalPartyDTO);
    return newPoliticalParty.data;
  }

  async updateByID(
    politicalPartyID: number,
    politicalPartyDTO: PoliticalPartyDTO
  ) {
    await backendAPI.patch(
      `political-parties/${politicalPartyID}`,
      politicalPartyDTO
    );
  }

  async deleteByID(politicalPartyID: number) {
    await backendAPI.delete(`political-parties/${politicalPartyID}`);
  }

  async joinByID(politicalPartyID: number) {
    await backendAPI.post(`political-parties/${politicalPartyID}/membership`);
  }

  async leaveByID(politicalPartyID: number) {
    await backendAPI.delete(`political-parties/${politicalPartyID}/membership`);
  }
}
