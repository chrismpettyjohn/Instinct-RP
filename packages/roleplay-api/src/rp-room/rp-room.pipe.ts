import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';
import {RPRoomRepository} from '../database/room/rp-room.repository';
import {RPRoomEntity} from '../database/room/rp-room.entity';

@Injectable()
export class RPRoomPipe implements PipeTransform {
  constructor(private readonly rpRoomRepo: RPRoomRepository) {}

  async transform(foodID: number): Promise<RPRoomEntity> {
    try {
      return await this.rpRoomRepo.findOneOrFail({id: foodID});
    } catch (e) {
      throw new NotFoundException('RP room does not exist');
    }
  }
}
