import {uniqBy} from 'lodash';
import {Injectable} from '@nestjs/common';
import {RPUserService} from '../user/user.service';
import {UserRPStatRepository} from '../database/user';
import {RPUser} from '@instinct-plugin/roleplay-types';
import {rpUserWire} from '../database/user/user.wire';
import {RPUserEntityStruct} from '../database/user/user.types';
import {RPUserRepository} from '../database/user/user.repository';
import {BusinessEntity} from '../database/business/business.entity';
import {BusinessPositionEntity} from '@instinct-plugin/roleplay-api';

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

    const rpUsers = (await Promise.all(
      uniqBy(
        userIDs.map((_: {id: number}) =>
          this.rpUserRepo.findOneOrFail({id: _.id})
        ),
        'id'
      )
    )) as any;

    const rpStats = await Promise.all(
      rpUsers.map((_: RPUserEntityStruct) =>
        this.rpUserService.getRPStatsForUser(_)
      )
    );

    return rpUsers.map((user: RPUserEntityStruct, index: number) =>
      rpUserWire(user, rpStats[index] as any)
    );
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

    const rpUsers = (await Promise.all(
      uniqBy(
        userIDs.map((_: {id: number}) =>
          this.rpUserRepo.findOneOrFail({id: _.id})
        ),
        'id'
      )
    )) as any;

    const rpStats = await Promise.all(
      rpUsers.map((_: RPUserEntityStruct) =>
        this.rpUserService.getRPStatsForUser(_)
      )
    );

    return rpUsers.map((user: RPUserEntityStruct, index: number) =>
      rpUserWire(user, rpStats[index] as any)
    );
  }
}
