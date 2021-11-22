import {PoliticalPartyDTO} from '@instinct-plugin/roleplay-types';

export interface EditPoliticalPartyProps {
  basePoliticalPartyDTO?: PoliticalPartyDTO;
  onSubmit(politicalPartyDTO: PoliticalPartyDTO): void;
}
