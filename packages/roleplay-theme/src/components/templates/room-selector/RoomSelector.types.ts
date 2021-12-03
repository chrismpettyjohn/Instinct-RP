import {RPRoom} from '@instinct-plugin/roleplay-types';

export interface RoomSelectorProps {
  roomID?: number;
  onChange(newRoom: RPRoom): void;
}
