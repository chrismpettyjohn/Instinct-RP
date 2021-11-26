import {useEffect, useState} from 'react';
import {Gang} from '@instinct-plugin/roleplay-types';
import {gangService} from '../../services/gang';

export function useFetchGangByID(gangID: string): Gang | undefined {
  const [gang, setGang] = useState<Gang>();

  useEffect(() => {
    async function fetchGang() {
      setGang(undefined);
      const data = await gangService.getByID(gangID);
      setGang(data);
    }

    fetchGang();
  }, [gangID]);

  return gang;
}
