import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {PropertyPhotoEntity} from './property-photo.entity';

@Injectable()
export class PropertyPhotosRepository extends BaseRepository<PropertyPhotoEntity> {
  constructor(
    @InjectRepository(PropertyPhotoEntity)
    propertyPhotoRepo: Repository<PropertyPhotoEntity>
  ) {
    super(propertyPhotoRepo, []);
  }
}
