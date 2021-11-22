import {
  PoliticalParty,
  PoliticalPartyDTO,
} from '@instinct-plugin/roleplay-types';

export interface PoliticalPartyService {
  getAll(): Promise<PoliticalParty[]>;
  getByID(politicalPartyID: number): Promise<PoliticalParty>;
  create(politicalPartyDTO: PoliticalPartyDTO): Promise<PoliticalParty>;
  updateByID(
    politicalPartyID: number,
    politicalPartyDTO: PoliticalPartyDTO
  ): Promise<void>;
  deleteByID(politicalPartyID: number): Promise<void>;
  joinByID(politicalPartyID: number): Promise<void>;
  leaveByID(politicalPartyID: number): Promise<void>;
}
