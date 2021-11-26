import {Repository} from 'typeorm';
import {FoodEntity} from './food.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '@instinct-api/database';

@Injectable()
export class FoodRepository extends BaseRepository<FoodEntity> {
  constructor(@InjectRepository(FoodEntity) foodRepo: Repository<FoodEntity>) {
    super(foodRepo, []);
  }
}
