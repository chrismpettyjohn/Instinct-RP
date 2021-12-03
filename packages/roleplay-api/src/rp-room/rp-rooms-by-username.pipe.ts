import {PipeTransform, Injectable} from '@nestjs/common';
import {RPRoomEntity} from '../database/room/rp-room.entity';
import {RPUserRepository} from '../database/user/user.repository';
import {RPRoomRepository} from '../database/room/rp-room.repository';

@Injectable()
export class RPRoomsByUsernamePipe implements PipeTransform {
  constructor(
    private readonly userRepo: RPUserRepository,
    private readonly roomRepo: RPRoomRepository
  ) {}

  async transform(username: string): Promise<RPRoomEntity[]> {
    const user = await this.userRepo.findOneOrFail({username});
    return await this.roomRepo.find({id: user.id!});
  }
}
