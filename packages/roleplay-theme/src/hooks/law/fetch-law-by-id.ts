import {useEffect, useState} from 'react';
import {lawService} from '@instinct-plugin/roleplay-web';
import {Law} from '@instinct-plugin/roleplay-types';

export function useFetchLawByID(
  lawID: number | string,
  reload = 0
): Law | undefined {
  const [law, setLaw] = useState<Law>();

  useEffect(() => {
    async function fetchLaw() {
      setLaw(undefined);
      const data = await lawService.getByID(Number(lawID));
      setLaw(data);
    }

    fetchLaw();
  }, [lawID, reload]);

  return law;
}
