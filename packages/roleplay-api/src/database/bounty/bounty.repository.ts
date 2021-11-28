import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {BountyEntity} from './bounty.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class BountyRepository extends BaseRepository<BountyEntity> {
  constructor(
    @InjectRepository(BountyEntity) bountyRepo: Repository<BountyEntity>
  ) {
    super(bountyRepo, [
      'targetUser',
      'targetUser.rank',
      'targetUser.rpStats',
      'addedByUser',
      'addedByUser.rank',
      'addedByUser.rpStats',
    ]);
  }
}
