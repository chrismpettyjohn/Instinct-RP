import {useEffect, useState} from 'react';
import {RPRoom} from '@instinct-plugin/roleplay-types';
import {rpRoomService} from '@instinct-plugin/roleplay-web';

export function useFetchRPRoomsByUsername(
  username: string
): RPRoom[] | undefined {
  const [rpRooms, setRPRooms] = useState<RPRoom[]>();

  useEffect(() => {
    async function fetchRooms() {
      setRPRooms(undefined);
      const data = await rpRoomService.getByUsername(username);
      setRPRooms(data);
    }

    fetchRooms();
  }, [username]);

  return rpRooms;
}
