import {PropertyEntity} from './property.entity';
import {rpRoomWire} from '../../room/rp-room.wire';
import {Property, RPUser} from '@instinct-plugin/roleplay-types';
import {propertyBidWire} from '../property-bids/property-bids.wire';
import {propertyPhotoWire} from '../property-photos/property-photos.wire';

export function propertyWire(
  entity: PropertyEntity,
  users: RPUser[]
): Property {
  return {
    id: entity.id!,
    room: rpRoomWire(entity.room!),
    user: users.find(_ => _.id === entity.userID)!,
    buyNowPrice: entity.buyNowPrice,
    bids: entity.bids!.map(bid =>
      propertyBidWire(bid, users.find(_ => _.id === bid.userID)!)
    ),
    photos: entity.photos!.map(propertyPhotoWire),
  };
}
