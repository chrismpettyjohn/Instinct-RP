import {Repository} from 'typeorm';
import {WeaponEntity} from './weapon.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class WeaponRepository extends BaseRepository<WeaponEntity> {
  constructor(
    @InjectRepository(WeaponEntity) weaponRepo: Repository<WeaponEntity>
  ) {
    super(weaponRepo, []);
  }
}
