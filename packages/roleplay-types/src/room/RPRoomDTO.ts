import {RPRoom} from './RPRoom';

export type RPRoomDTO = Omit<RPRoom, 'id' | 'roomName'>;
