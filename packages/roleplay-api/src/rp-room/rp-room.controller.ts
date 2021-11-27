import {HasSession} from '@instinct-api/session';
import {RPRoom} from '@instinct-plugin/roleplay-types';
import {HasRPScope} from '../session/permission-scope.decorator';
import {Body, Controller, Get, Param, Patch} from '@nestjs/common';
import {RPRoomRepository} from '../database/room/rp-room.repository';
import {rpRoomWire} from '../database/room/rp-room.wire';
import {RPRoomEntity, RPRoomFeature} from '../database/room/rp-room.entity';
import {RPRoomPipe} from './rp-room.pipe';
import {RPRoomDTOImplementation} from './rp-room.dto';

@Controller('rp-rooms')
@HasSession()
export class RPRoomController {
  constructor(private readonly rpRooms: RPRoomRepository) {}

  @Get()
  async getRPRooms(): Promise<RPRoom[]> {
    const rpRooms = await this.rpRooms.find();
    return rpRooms.map(rpRoomWire);
  }

  @Get(':rpRoomID')
  async getRPRoomByID(
    @Param('rpRoomID', RPRoomPipe) rpRoom: RPRoomEntity
  ): Promise<RPRoom> {
    return rpRoomWire(rpRoom);
  }

  @Patch(':rpRoomID')
  @HasRPScope('websiteManageRooms')
  async updateRPRoomByID(
    @Param('rpRoomID', RPRoomPipe) rpRoom: RPRoomEntity,
    @Body() rpRoomDTO: RPRoomDTOImplementation
  ) {
    await this.rpRooms.update(
      {id: rpRoom.id!},
      {
        ...rpRoomDTO,
        bankEnabled: rpRoomDTO.bankEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        casinoEnabled: rpRoomDTO.casinoEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        meleeEnabled: rpRoomDTO.meleeEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        shootEnabled: rpRoomDTO.shootEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        bombEnabled: rpRoom.bombEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        hitEnabled: rpRoom.hitEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        magicEnabled: rpRoom.magicEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        robEnabled: rpRoom.robEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        daylightEnabled: rpRoom.daylightEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        turfEnabled: rpRoom.turfEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        hospitalEnabled: rpRoom.hospitalEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        safezoneEnabled: rpRoom.safezoneEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        mwEnabled: rpRoom.mwEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        gymEnabled: rpRoom.gymEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        taxiToEnabled: rpRoom.taxiToEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
        taxiFromEnabled: rpRoom.taxiFromEnabled
          ? RPRoomFeature.Enabled
          : RPRoomFeature.Disabled,
      }
    );
  }
}
