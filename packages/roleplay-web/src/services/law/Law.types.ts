import {Law, LawDTO, LawVoteDTO} from '@instinct-plugin/roleplay-types';

export interface LawService {
  getAll(): Promise<Law[]>;
  getByID(lawID: number): Promise<Law>;
  create(lawDTO: LawDTO): Promise<Law>;
  updateByID(lawID: number, lawDTO: LawDTO): Promise<Law>;
  deleteByID(lawID: number): Promise<void>;
  voteByID(lawID: number, lawVoteDTO: LawVoteDTO): Promise<void>;
  openVotingByID(lawID: number): Promise<void>;
  stopVotingByID(lawID: number): Promise<void>;
}
