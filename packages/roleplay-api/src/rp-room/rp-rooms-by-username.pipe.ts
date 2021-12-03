import {In} from 'typeorm';
import {RoomRepository} from '@instinct-api/database';
import {PipeTransform, Injectable} from '@nestjs/common';
import {RPRoomEntity} from '../database/room/rp-room.entity';
import {RPUserRepository} from '../database/user/user.repository';
import {RPRoomRepository} from '../database/room/rp-room.repository';

@Injectable()
export class RPRoomsByUsernamePipe implements PipeTransform {
  constructor(
    private readonly userRepo: RPUserRepository,
    private readonly roomRepo: RoomRepository,
    private readonly rpRoomRepo: RPRoomRepository
  ) {}

  async transform(username: string): Promise<RPRoomEntity[]> {
    const user = await this.userRepo.findOneOrFail({username});
    const ownedRooms = await this.roomRepo.find({ownerID: user.id!});

    if (ownedRooms.length === 0) {
      return [];
    }

    return await this.rpRoomRepo.find({
      id:
        ownedRooms?.length > 1
          ? In(ownedRooms.map(_ => _.id))
          : ownedRooms[0].id,
    });
  }
}
