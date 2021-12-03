import {RPRoom, RPRoomDTO} from '@instinct-plugin/roleplay-types';

export interface RPRoomService {
  getAll(): Promise<RPRoom[]>;
  getByID(rpRoomID: string): Promise<RPRoom>;
  getByUsername(username: string): Promise<RPRoom[]>;
  updateByID(rpRoomID: string, rpRoomDTO: RPRoomDTO): Promise<void>;
}
