import {createFetchHook} from '@instinct-web/core';
import {PoliticalParty} from '@instinct-plugin/roleplay-types';
import {politicalPartyService} from '@instinct-plugin/roleplay-web';

export const useFetchPoliticalParties = () =>
  createFetchHook<PoliticalParty[]>(politicalPartyService.getAll);
