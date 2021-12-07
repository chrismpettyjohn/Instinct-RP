import {AxiosResponse} from 'axios';
import {LawService} from './Law.types';
import {backendAPI} from '@instinct-web/core';
import {
  Law,
  LawDTO,
  LawPresidentialDecisionDTO,
  LawVoteDTO,
} from '@instinct-plugin/roleplay-types';

export class LawServiceImplementation implements LawService {
  async getAll() {
    const laws: AxiosResponse<Law[]> = await backendAPI.get('laws');
    return laws.data;
  }

  async getByID(lawID: number) {
    const lawData: AxiosResponse<Law> = await backendAPI.get(`laws/${lawID}`);
    return lawData.data;
  }

  async create(lawDTO: LawDTO) {
    const newLaw: AxiosResponse<Law> = await backendAPI.post('laws', lawDTO);
    return newLaw.data;
  }

  async updateByID(lawID: number, lawDTO: LawDTO) {
    const newLaw: AxiosResponse<Law> = await backendAPI.patch(
      `laws/${lawID}`,
      lawDTO
    );
    return newLaw.data;
  }

  async deleteByID(lawID: number) {
    await backendAPI.delete(`laws/${lawID}`);
  }

  async voteByID(lawID: number, lawVoteDTO: LawVoteDTO) {
    await backendAPI.post(`laws/${lawID}/vote`, lawVoteDTO);
  }

  async openVotingByID(lawID: number) {
    await backendAPI.post(`laws/${lawID}/voting`);
  }

  async stopVotingByID(lawID: number) {
    await backendAPI.post(`laws/${lawID}/voting/stop`);
  }

  async givePresidentialReview(
    lawID: number,
    presidentialReview: LawPresidentialDecisionDTO
  ) {
    await backendAPI.post(
      `laws/${lawID}/presidential-review`,
      presidentialReview
    );
  }
}
