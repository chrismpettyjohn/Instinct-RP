import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {GamblingMachineEntity} from './gambling.entity';

@Injectable()
export class GamblingMachineRepository extends BaseRepository<GamblingMachineEntity> {
  constructor(
    @InjectRepository(GamblingMachineEntity)
    gamblingMachineRepo: Repository<GamblingMachineEntity>
  ) {
    super(gamblingMachineRepo, []);
  }
}
