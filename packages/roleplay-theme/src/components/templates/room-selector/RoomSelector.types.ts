import {RPRoom} from '@instinct-plugin/roleplay-types';

export interface RoomSelectorProps {
  rooms: RPRoom[];
  roomID?: number;
  onChange(newRoom: RPRoom): void;
}
