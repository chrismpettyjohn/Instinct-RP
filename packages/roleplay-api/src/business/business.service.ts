import {uniqBy} from 'lodash';
import {Injectable} from '@nestjs/common';
import {RPUserService} from '../user/user.service';
import {UserRPStatRepository} from '../database/user';
import {rpUserWire} from '../database/user/user.wire';
import {RPUser} from '@instinct-plugin/roleplay-types';
import {RPUserRepository} from '../database/user/user.repository';
import {BusinessEntity} from '../database/business/business.entity';
import {BusinessPositionEntity} from '../database/business/business-position.entity';

@Injectable()
export class BusinessService {
  constructor(
    private readonly rpStatRepo: UserRPStatRepository,
    private readonly rpUserRepo: RPUserRepository,
    private readonly rpUserService: RPUserService
  ) {}

  async getUsersInBusiness(business: BusinessEntity): Promise<RPUser[]> {
    const userIDs: Array<{id: number}> = await this.rpStatRepo
      .getInstance()
      .createQueryBuilder()
      .select('id')
      .where("SUBSTRING_INDEX(job, ';', 1) = :businessID", {
        businessID: business.id!,
      })
      .execute();

    userIDs.push({id: business.userID});

    const uniqueUserIDs = uniqBy(userIDs, 'id');

    const rpUsers: RPUser[] = [];

    for (const rpUser of uniqueUserIDs) {
      const user = await this.rpUserRepo.findOneOrFail({id: rpUser.id});
      const stats = await this.rpUserService.getRPStatsForUser(user);
      rpUsers.push(rpUserWire(user, stats));
    }
    return rpUsers;
  }

  async getUsersInPosition(
    position: BusinessPositionEntity
  ): Promise<RPUser[]> {
    const userIDs: Array<{id: number}> = await this.rpStatRepo
      .getInstance()
      .createQueryBuilder()
      .select('id')
      .where("SUBSTRING_INDEX(job, ';', 1) = :businessID", {
        businessID: position.jobID,
      })
      .andWhere("SUBSTRING_INDEX(job, ';', 2) = :businessID", {
        businessID: position.id!,
      })
      .execute();

    const rpUsers: RPUser[] = [];

    const uniqueUserIDs = uniqBy(userIDs, 'id');

    for (const rpUser of uniqueUserIDs) {
      const user = await this.rpUserRepo.findOneOrFail({id: rpUser.id!});
      const stats = await this.rpUserService.getRPStatsForUser(user);
      rpUsers.push(rpUserWire(user, stats));
    }

    return rpUsers;
  }
}
