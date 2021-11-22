import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {RPUserEntity} from './user.entity';
import {RPUserEntityStruct} from './user.types';
import {InjectRepository} from '@nestjs/typeorm';
import {HashService} from '@instinct-api/common';
import {BaseRepository} from '@instinct-api/database';
import {UserRPStatRepository} from './rp-stats.repository';

@Injectable()
export class RPUserRepository extends BaseRepository<RPUserEntityStruct> {
  constructor(
    private readonly hashService: HashService,
    private readonly rpStatsRepo: UserRPStatRepository,
    @InjectRepository(RPUserEntity) userRepo: Repository<RPUserEntityStruct>
  ) {
    super(userRepo, [
      'rank',
      'bans',
      'rpStats',
      'betaCode',
      'rpStats.politicalParty',
      'rpStats.politicalParty.politicalParty',
    ]);
  }

  async create(user: RPUserEntityStruct): Promise<RPUserEntityStruct> {
    const newUser = await super.create({
      ...user,
      password: this.hashService.generate(user.password),
    });
    await this.rpStatsRepo.create({
      id: user.id!,
    } as any);
    return this.findOneOrFail({id: newUser.id!});
  }

  getAll(): Promise<RPUserEntityStruct[]> {
    return this.find({}, {id: 'DESC'});
  }
}
