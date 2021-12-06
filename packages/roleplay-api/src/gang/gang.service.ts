import {Injectable} from '@nestjs/common';
import {UserRPStatRepository} from '../database/user';
import {RPUserEntityStruct} from '../database/user/user.types';
import {Gang, RPUser} from '@instinct-plugin/roleplay-types';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';
import {RPUserEntity} from '../database/user/user.entity';
import {RPUserRepository} from '../database/user/user.repository';
import {GangEntity, gangWire} from '../database/gang';

@Injectable()
export class GangService {
  constructor(
    private readonly rpStatRepo: UserRPStatRepository,
    private readonly rpUserRepo: RPUserRepository,
    private readonly rpUserService: RPUserService
  ) {}

  getUsersInGang = async (gang: GangEntity): Promise<RPUser[]> => {
    const userIDs: Array<{id: number}> = await this.rpStatRepo
      .getInstance()
      .createQueryBuilder()
      .select('id')
      .where("SUBSTRING_INDEX(gang, ';', 1) = :gangID", {gangID: gang.id!})
      .execute();

    userIDs.push({id: gang.userID});

    const userProfiles: RPUserEntityStruct[] = await Promise.all(
      userIDs.map(_ => this.rpUserRepo.findOneOrFail({id: _.id}))
    );

    const userRPStats = await Promise.all(
      userProfiles.map(_ => this.rpUserService.getRPStatsForUser(_))
    );

    return userProfiles.map(
      (userProfile: RPUserEntity, profileIndex: number) => {
        return rpUserWire(userProfile, userRPStats[profileIndex]);
      }
    );
  };

  getWire = async (gang: GangEntity): Promise<Gang> => {
    const gangUsers = await this.getUsersInGang(gang);
    return gangWire(gang, gangUsers);
  };
}
