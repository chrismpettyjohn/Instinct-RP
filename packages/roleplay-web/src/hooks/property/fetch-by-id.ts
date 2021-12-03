import {useEffect, useState} from 'react';
import {propertyService} from '../../services/property';
import {Property} from '@instinct-plugin/roleplay-types';

export function useFetchPropertyByID(
  propertyID: string,
  refresh = 0
): Property | undefined {
  const [property, setProperty] = useState<Property>();

  useEffect(() => {
    async function fetchProperty() {
      setProperty(undefined);
      const data = await propertyService.getByID(propertyID);
      setProperty(data);
    }

    fetchProperty();
  }, [propertyID, refresh]);

  return property;
}
