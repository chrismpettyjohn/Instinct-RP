import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {BusinessPositionEntity} from './business-position.entity';

@Injectable()
export class BusinessPositionRepository extends BaseRepository<BusinessPositionEntity> {
  constructor(
    @InjectRepository(BusinessPositionEntity)
    businessPositionRepo: Repository<BusinessPositionEntity>
  ) {
    super(businessPositionRepo, []);
  }
}
