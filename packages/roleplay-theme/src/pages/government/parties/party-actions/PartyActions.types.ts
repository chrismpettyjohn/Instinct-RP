import {PoliticalParty} from '@instinct-plugin/roleplay-types';

export interface PartyActionsProps {
  politicalParty: PoliticalParty;
  onChange(): void;
}
