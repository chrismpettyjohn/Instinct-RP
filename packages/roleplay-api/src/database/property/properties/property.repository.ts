import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PropertyEntity} from './property.entity';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class PropertyRepository extends BaseRepository<PropertyEntity> {
  constructor(
    @InjectRepository(PropertyEntity) propertyRepo: Repository<PropertyEntity>
  ) {
    super(propertyRepo, [
      'room',
      'user',
      'user.rank',
      'user.rpStats',
      'bids',
      'bids.user',
      'bids.user.rank',
      'bids.user.rpStats',
      'photos',
    ]);
  }
}
