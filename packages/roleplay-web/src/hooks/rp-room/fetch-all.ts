import {createFetchHook} from '@instinct-web/core';
import {RPRoom} from '@instinct-plugin/roleplay-types';
import {rpRoomService} from '@instinct-plugin/roleplay-web';

export const useFetchAllRPRooms = (refresh = 0) =>
  createFetchHook<RPRoom[]>(rpRoomService.getAll, refresh);
