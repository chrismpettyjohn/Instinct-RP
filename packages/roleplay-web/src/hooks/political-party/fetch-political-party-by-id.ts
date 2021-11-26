import {useEffect, useState} from 'react';
import {PoliticalParty} from '@instinct-plugin/roleplay-types';
import {politicalPartyService} from '../../services/political-party';

export function useFetchPoliticalPartyByID(
  politicalPartyID: number | string,
  reload = 0
): PoliticalParty | undefined {
  const [politicalParty, setPoliticalParty] = useState<PoliticalParty>();

  useEffect(() => {
    async function fetchPoliticalParty() {
      setPoliticalParty(undefined);
      const data = await politicalPartyService.getByID(
        Number(politicalPartyID)
      );
      setPoliticalParty(data);
    }

    fetchPoliticalParty();
  }, [politicalPartyID, reload]);

  return politicalParty;
}
