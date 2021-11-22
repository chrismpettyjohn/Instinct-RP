import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {GuideEntity} from './guide.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class GuideRepository extends BaseRepository<GuideEntity> {
  constructor(
    @InjectRepository(GuideEntity) guideRepo: Repository<GuideEntity>
  ) {
    super(guideRepo, [
      'user',
      'user.rank',
      'user.rpStats',
      'category',
      'reactions',
      'reactions.user',
      'reactions.user.rank',
      'reactions.user.rpStats',
    ]);
  }
}
