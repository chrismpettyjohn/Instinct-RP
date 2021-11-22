import {Repository} from 'typeorm';
import {LawEntity} from './law.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class LawRepository extends BaseRepository<LawEntity> {
  constructor(@InjectRepository(LawEntity) lawRepo: Repository<LawEntity>) {
    super(lawRepo, [
      'user',
      'user.rank',
      'user.rpStats',
      'votes',
      'votes.user',
      'votes.user.rank',
      'votes.user.rpStats',
      'comments',
      'comments.user',
      'comments.user.rank',
      'comments.user.rpStats',
      'events',
    ]);
  }
}
