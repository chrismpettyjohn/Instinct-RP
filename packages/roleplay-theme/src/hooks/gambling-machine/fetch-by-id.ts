import {useEffect, useState} from 'react';
import {GamblingMachine} from '@instinct-plugin/roleplay-types';
import {gamblingMachineService} from '../../services/gambling-machine';

export function useFetchGamblingMachineByID(
  gamblingMachineID: string
): GamblingMachine | undefined {
  const [gamblingMachine, setGamblingMachine] = useState<GamblingMachine>();

  useEffect(() => {
    async function fetchFood() {
      setGamblingMachine(undefined);
      const data = await gamblingMachineService.getByID(gamblingMachineID);
      setGamblingMachine(data);
    }

    fetchFood();
  }, [gamblingMachineID]);

  return gamblingMachine;
}
