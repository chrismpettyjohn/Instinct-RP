import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {LawEventEntity} from './law-event.entity';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class LawEventRepository extends BaseRepository<LawEventEntity> {
  constructor(
    @InjectRepository(LawEventEntity) lawEventRepo: Repository<LawEventEntity>
  ) {
    super(lawEventRepo, []);
  }
}
