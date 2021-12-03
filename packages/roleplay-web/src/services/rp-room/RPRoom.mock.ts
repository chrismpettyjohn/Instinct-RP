import {RPRoomService} from './RPRoom.types';
import {exampleRPRoom, RPRoomDTO} from '@instinct-plugin/roleplay-types';

export class RPRoomServiceMock implements RPRoomService {
  async getAll() {
    return [exampleRPRoom];
  }

  async getByID(rpRoomID: string) {
    return exampleRPRoom;
  }

  async getByUsername(username: string) {
    return [exampleRPRoom];
  }

  async updateByID(rpRoomID: string, rpRoomDTO: RPRoomDTO) {}
}
