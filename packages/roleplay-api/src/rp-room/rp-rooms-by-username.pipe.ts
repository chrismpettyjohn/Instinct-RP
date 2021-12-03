import {PipeTransform, Injectable} from '@nestjs/common';
import {RPUserRepository} from '../database/user/user.repository';
import {RoomRepository, RoomEntityStruct} from '@instinct-api/database';

@Injectable()
export class RPRoomsByUsernamePipe implements PipeTransform {
  constructor(
    private readonly userRepo: RPUserRepository,
    private readonly roomRepo: RoomRepository
  ) {}

  async transform(username: string): Promise<RoomEntityStruct[]> {
    const user = await this.userRepo.findOneOrFail({username});
    return await this.roomRepo.find({id: user.id!});
  }
}
