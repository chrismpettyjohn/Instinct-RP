import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {GuideCategoryEntity} from './guide-category.entity';

@Injectable()
export class GuideCategoryRepository extends BaseRepository<GuideCategoryEntity> {
  constructor(
    @InjectRepository(GuideCategoryEntity)
    guideCategoryRepo: Repository<GuideCategoryEntity>
  ) {
    super(guideCategoryRepo, []);
  }
}
