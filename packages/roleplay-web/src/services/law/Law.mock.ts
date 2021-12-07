import {LawService} from './Law.types';
import {
  exampleLaw,
  LawDTO,
  LawPresidentialDecisionDTO,
  LawVoteDTO,
} from '@instinct-plugin/roleplay-types';

export class LawServiceMock implements LawService {
  async getAll() {
    return [exampleLaw];
  }

  async getByID(lawID: number) {
    return exampleLaw;
  }

  async create(lawDTO: LawDTO) {
    return exampleLaw;
  }

  async updateByID(lawID: number, lawDTO: LawDTO) {
    return {
      ...exampleLaw,
      ...lawDTO,
    };
  }

  async deleteByID(lawID: number) {}

  async voteByID(lawID: number, lawVoteDTO: LawVoteDTO) {}

  async openVotingByID(lawID: number) {}

  async stopVotingByID(lawID: number) {}

  async givePresidentialReview(
    lawID: number,
    presidentialReview: LawPresidentialDecisionDTO
  ) {}
}
