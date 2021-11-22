import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {BusinessEntity} from './business.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class BusinessRepository extends BaseRepository<BusinessEntity> {
  constructor(
    @InjectRepository(BusinessEntity) businessRepo: Repository<BusinessEntity>
  ) {
    super(businessRepo, [
      'user',
      'user.rank',
      'user.rpStats',
      'user.rpStats.politicalParty',
      'user.rpStats.politicalParty.politicalParty',
      'positions',
    ]);
  }
}
