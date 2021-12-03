import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {PropertyBidsEntity} from './property-bids.entity';

@Injectable()
export class PropertyBidsRepository extends BaseRepository<PropertyBidsEntity> {
  constructor(
    @InjectRepository(PropertyBidsEntity)
    propertyBidsRepo: Repository<PropertyBidsEntity>
  ) {
    super(propertyBidsRepo, []);
  }
}
