import {useEffect, useState} from 'react';
import {propertyService} from '../../services/property';
import {Property} from '@instinct-plugin/roleplay-types';

export function useFetchPropertiesByUsername(
  username: string,
  refresh = 0
): Property[] | undefined {
  const [properties, setProperties] = useState<Property[]>();

  useEffect(() => {
    async function fetchProperty() {
      setProperties(undefined);
      const data = await propertyService.getByUsername(username);
      setProperties(data);
    }

    fetchProperty();
  }, [username, refresh]);

  return properties;
}
