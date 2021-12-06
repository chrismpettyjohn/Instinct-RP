import {Injectable} from '@nestjs/common';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';
import {rpRankWire} from '../database/rank/rank.wire';
import {RPRank} from '@instinct-plugin/roleplay-types';
import {UserRepository} from '@instinct-api/database';
import {RPRankEntityStruct} from '../database/rank/rank.types';

@Injectable()
export class RankService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userService: RPUserService
  ) {}

  getWireForRank = async (entity: RPRankEntityStruct): Promise<RPRank> => {
    const rpUsers = await Promise.all(
      entity.users!.map(_ => this.userRepo.findOneOrFail({id: _.id!}))
    );
    const rpStats = await Promise.all(
      rpUsers.map(_ => this.userService.getRPStatsForUser(_ as any))
    );
    const userWires = rpUsers.map((user, index) =>
      rpUserWire(user as any, rpStats[index])
    );
    return rpRankWire(entity, userWires);
  };
}
