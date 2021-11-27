import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {RPRoomEntity} from './rp-room.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class RPRoomRepository extends BaseRepository<RPRoomEntity> {
  constructor(
    @InjectRepository(RPRoomEntity) rpRoomRepo: Repository<RPRoomEntity>
  ) {
    super(rpRoomRepo, ['room']);
  }
}
