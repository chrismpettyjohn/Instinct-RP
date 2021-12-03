import {RPUser} from '../user/User';
import {exampleUser} from '@instinct-prj/interface';
import {exampleRPRoom, RPRoom} from '../room/RPRoom';

export interface Property {
  id: number;
  room: RPRoom;
  user: RPUser;
  buyNowPrice: number;
  bids: PropertyBid[];
  photos: PropertyPhoto[];
}
export interface PropertyBid {
  id: number;
  user: RPUser;
  offer: number;
}

export interface PropertyPhoto {
  id: number;
  photoURL: string;
  isPrimaryPhoto: boolean;
}

export const exampleProperty: Property = {
  id: 1,
  room: exampleRPRoom,
  user: exampleUser as any,
  buyNowPrice: 5000,
  bids: [],
  photos: [],
};
