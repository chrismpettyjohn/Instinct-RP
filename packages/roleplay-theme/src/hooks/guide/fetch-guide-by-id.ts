import {useEffect, useState} from 'react';
import {guideService} from '../../services/guide';
import {Guide} from '@instinct-plugin/roleplay-types';

export function useFetchGuideByID(
  guideID: string,
  refresh = 0
): Guide | undefined {
  const [guide, setGuide] = useState<Guide>();

  useEffect(() => {
    async function fetchGuide() {
      setGuide(undefined);
      const data = await guideService.getByID(guideID);
      setGuide(data);
    }

    fetchGuide();
  }, [guideID, refresh]);

  return guide;
}
