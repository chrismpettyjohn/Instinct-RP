import {AxiosResponse} from 'axios';
import {RPRoomService} from './RPRoom.types';
import {backendAPI} from '@instinct-web/core';
import {RPRoom, RPRoomDTO} from '@instinct-plugin/roleplay-types';

export class RPRoomServiceImplementation implements RPRoomService {
  async getAll() {
    const foods: AxiosResponse<RPRoom[]> = await backendAPI.get('rp-rooms');
    return foods.data;
  }

  async getByID(rpRoomID: string) {
    const food: AxiosResponse<RPRoom> = await backendAPI.get(
      `rp-rooms/${rpRoomID}`
    );
    return food.data;
  }

  async getByUsername(username: string) {
    const food: AxiosResponse<RPRoom[]> = await backendAPI.get(
      `rp-rooms/by-user/${username}`
    );
    return food.data;
  }

  async updateByID(rpRoomID: string, rpRoomDTO: RPRoomDTO) {
    await backendAPI.patch(`rp-rooms/${rpRoomID}`, rpRoomDTO);
  }
}
