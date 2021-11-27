import {RPRoomService} from './RPRoom.types';
import {RPRoomServiceMock} from './RPRoom.mock';
import {RPRoomServiceImplementation} from './RPRoom';

export const rpRoomService: RPRoomService =
  process.env.NODE_ENV !== 'test'
    ? new RPRoomServiceImplementation()
    : new RPRoomServiceMock();
