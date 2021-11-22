import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GangRankEntity} from './gang-rank.entity';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class GangRankRepository extends BaseRepository<GangRankEntity> {
  constructor(
    @InjectRepository(GangRankEntity) gangRepo: Repository<GangRankEntity>
  ) {
    super(gangRepo, []);
  }
}
