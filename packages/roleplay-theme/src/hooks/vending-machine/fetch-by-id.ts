import {useEffect, useState} from 'react';
import {VendingMachine} from '@instinct-plugin/roleplay-types';
import {vendingMachineService} from '../../services/vending-machine';

export function useFetchVendingMachineByID(
  vendingMachineID: string
): VendingMachine | undefined {
  const [vendingMachine, setVendingMachine] = useState<VendingMachine>();

  useEffect(() => {
    async function fetchVendingMachine() {
      setVendingMachine(undefined);
      const data = await vendingMachineService.getByID(vendingMachineID);
      setVendingMachine(data);
    }

    fetchVendingMachine();
  }, [vendingMachineID]);

  return vendingMachine;
}
