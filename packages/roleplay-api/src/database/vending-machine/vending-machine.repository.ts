import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';
import {VendingMachineEntity} from './vending-machine.entity';

@Injectable()
export class VendingMachineRepository extends BaseRepository<VendingMachineEntity> {
  constructor(
    @InjectRepository(VendingMachineEntity)
    vendingMachineRepo: Repository<VendingMachineEntity>
  ) {
    super(vendingMachineRepo, []);
  }
}
