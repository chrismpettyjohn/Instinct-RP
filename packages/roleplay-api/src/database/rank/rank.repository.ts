import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {RPRankEntity} from './rank.entity';
import {RPRankEntityStruct} from './rank.types';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository, PermissionStatus} from '@instinct-api/database';

@Injectable()
export class RPRankRepository extends BaseRepository<RPRankEntityStruct> {
  constructor(
    @InjectRepository(RPRankEntity) rankRepo: Repository<RPRankEntityStruct>
  ) {
    super(rankRepo, ['users']);
  }

  async create(rank: RPRankEntityStruct): Promise<RPRankEntityStruct> {
    const newRank = await super.create(rank);
    return this.findOneOrFail({id: newRank.id!});
  }

  getAll(): Promise<RPRankEntityStruct[]> {
    return this.find({}, {id: 'DESC'});
  }

  getStaff(): Promise<RPRankEntityStruct[]> {
    return this.repo.find({
      where: {
        websiteShowStaff: PermissionStatus.Enabled,
      },
      order: {
        id: 'DESC',
      },
      relations: this.eagerRelations,
    });
  }
}
