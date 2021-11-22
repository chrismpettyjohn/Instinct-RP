import {useEffect, useState} from 'react';
import {Business} from '@instinct-plugin/roleplay-types';
import {businessService} from '../../services/business';

export function useFetchBusinessByID(businessID: string): Business | undefined {
  const [business, setBusiness] = useState<Business>();

  useEffect(() => {
    async function fetchBusiness() {
      setBusiness(undefined);
      const data = await businessService.getByID(businessID);
      setBusiness(data);
    }

    fetchBusiness();
  }, [businessID]);

  return business;
}
