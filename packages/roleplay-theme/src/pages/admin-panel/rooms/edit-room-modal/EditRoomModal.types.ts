import {RPRoom} from '@instinct-plugin/roleplay-types';

export interface EditRoomModalProps {
  rpRoom: RPRoom;
  onChange(): void;
}
