import {useEffect, useState} from 'react';
import {crimeService} from '../../services/crime';
import {Crime} from '@instinct-plugin/roleplay-types';

export function useFetchCrimeByID(crimeID: string): Crime | undefined {
  const [crime, setCrime] = useState<Crime>();

  useEffect(() => {
    async function fetchCrime() {
      setCrime(undefined);
      const data = await crimeService.getByID(crimeID);
      setCrime(data);
    }

    fetchCrime();
  }, [crimeID]);

  return crime;
}
