import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {PoliticalPartyEntity} from './political-party.entity';

@Injectable()
export class PoliticalPartyRepository extends BaseRepository<PoliticalPartyEntity> {
  constructor(
    @InjectRepository(PoliticalPartyEntity)
    politicalPartyRepo: Repository<PoliticalPartyEntity>
  ) {
    super(politicalPartyRepo, [
      'user',
      'user.rank',
      'members',
      'members.user',
      'members.user.user',
      'members.user.user.rank',
    ]);
  }
}
