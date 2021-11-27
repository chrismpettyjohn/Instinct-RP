import {RPRoomEntity, RPRoomFeature} from './rp-room.entity';
import {RPRoom} from '@instinct-plugin/roleplay-types';

export function rpRoomWire(entity: RPRoomEntity): RPRoom {
  return {
    id: entity.id!,
    roomName: entity.room!.name,
    bankEnabled: entity.bankEnabled === RPRoomFeature.Enabled,
    casinoEnabled: entity.casinoEnabled === RPRoomFeature.Enabled,
    meleeEnabled: entity.meleeEnabled === RPRoomFeature.Enabled,
    shootEnabled: entity.shootEnabled === RPRoomFeature.Enabled,
    bombEnabled: entity.bombEnabled === RPRoomFeature.Enabled,
    hitEnabled: entity.hitEnabled === RPRoomFeature.Enabled,
    magicEnabled: entity.magicEnabled === RPRoomFeature.Enabled,
    robEnabled: entity.robEnabled === RPRoomFeature.Enabled,
    daylightEnabled: entity.daylightEnabled === RPRoomFeature.Enabled,
    turfEnabled: entity.turfEnabled === RPRoomFeature.Enabled,
    hospitalEnabled: entity.hospitalEnabled === RPRoomFeature.Enabled,
    safezoneEnabled: entity.safezoneEnabled === RPRoomFeature.Enabled,
    mwEnabled: entity.mwEnabled === RPRoomFeature.Enabled,
    gymEnabled: entity.gymEnabled === RPRoomFeature.Enabled,
    taxiToEnabled: entity.taxiToEnabled === RPRoomFeature.Enabled,
    taxiFromEnabled: entity.taxiFromEnabled === RPRoomFeature.Enabled,
    enterMessage: entity.enterMessage,
    openTime: entity.openTime,
    closeTime: entity.closeTime,
  };
}
