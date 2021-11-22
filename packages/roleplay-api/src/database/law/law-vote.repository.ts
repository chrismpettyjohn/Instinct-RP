import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {LawVoteEntity} from './law-vote.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class LawVoteRepository extends BaseRepository<LawVoteEntity> {
  constructor(
    @InjectRepository(LawVoteEntity) lawVoteRepo: Repository<LawVoteEntity>
  ) {
    super(lawVoteRepo, []);
  }
}
