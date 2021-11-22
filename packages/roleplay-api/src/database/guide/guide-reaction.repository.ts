import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {GuideReactionEntity} from './guide-reaction.entity';

@Injectable()
export class GuideReactionRepository extends BaseRepository<GuideReactionEntity> {
  constructor(
    @InjectRepository(GuideReactionEntity)
    guideReactionRepo: Repository<GuideReactionEntity>
  ) {
    super(guideReactionRepo, []);
  }
}
