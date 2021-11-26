import {Repository} from 'typeorm';
import {CrimeEntity} from './crime.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class CrimeRepository extends BaseRepository<CrimeEntity> {
  constructor(
    @InjectRepository(CrimeEntity) crimeRepo: Repository<CrimeEntity>
  ) {
    super(crimeRepo, []);
  }
}
