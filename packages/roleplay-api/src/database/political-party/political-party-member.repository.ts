import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {PoliticalPartyMemberEntity} from './political-party-member.entity';

@Injectable()
export class PoliticalPartyMemberRepository extends BaseRepository<PoliticalPartyMemberEntity> {
  constructor(
    @InjectRepository(PoliticalPartyMemberEntity)
    politicalPartyMemberRepo: Repository<PoliticalPartyMemberEntity>
  ) {
    super(politicalPartyMemberRepo, [
      'user',
      'user.rank',
      'user.rpStats',
      'members',
      'members.user',
      'members.user.user',
      'members.user.user.rank',
    ]);
  }
}
