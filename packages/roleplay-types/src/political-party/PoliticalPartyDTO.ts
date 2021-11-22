import {PoliticalIdeology} from './PoliticalParty';

export interface PoliticalPartyDTO {
  name: string;
  description: string;
  about: string;
  badge: string;
  ideology: PoliticalIdeology;
}
