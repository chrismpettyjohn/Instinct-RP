import {PropertyBidsEntity} from './property-bids.entity';
import {PropertyBid, RPUser} from '@instinct-plugin/roleplay-types';

export function propertyBidWire(
  entity: PropertyBidsEntity,
  user: RPUser
): PropertyBid {
  return {
    user,
    id: entity.id!,
    offer: entity.offer,
    approved: entity.accepted !== null ? entity.accepted === 1 : undefined,
  };
}
