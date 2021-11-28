import {useEffect, useState} from 'react';
import {bountyService} from '../../services/bounty';
import {Bounty} from '@instinct-plugin/roleplay-types';

export function useFetchBountyByID(bountyID: string): Bounty | undefined {
  const [bounty, setBounty] = useState<Bounty>();

  useEffect(() => {
    async function fetchBounty() {
      setBounty(undefined);
      const data = await bountyService.getByID(bountyID);
      setBounty(data);
    }

    fetchBounty();
  }, [bountyID]);

  return bounty;
}
