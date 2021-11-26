import {useEffect, useState} from 'react';
import {weaponService} from '../../services/weapon';
import {Weapon} from '@instinct-plugin/roleplay-types';

export function useFetchWeaponByID(weaponID: string): Weapon | undefined {
  const [weapon, setWeapon] = useState<Weapon>();

  useEffect(() => {
    async function fetchWeapon() {
      setWeapon(undefined);
      const data = await weaponService.getByID(weaponID);
      setWeapon(data);
    }

    fetchWeapon();
  }, [weaponID]);

  return weapon;
}
