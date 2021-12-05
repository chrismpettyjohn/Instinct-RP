import Moment from 'moment';
import {take, orderBy} from 'lodash';
import {Controller, Get} from '@nestjs/common';
import {HasSession} from '@instinct-api/session';
import {RPUserService} from '../../user/user.service';
import {rpUserWire} from '../../database/user/user.wire';
import {RPUserRepository} from '../../database/user/user.repository';
import {
  RPUser,
  UserHighScores,
  UserRPStats,
} from '@instinct-plugin/roleplay-types';

@Controller('high-scores')
@HasSession()
export class HighScoreController {
  constructor(
    private readonly userRepo: RPUserRepository,
    private readonly rpUserService: RPUserService
  ) {}

  @Get('users')
  async getUserHighScores(): Promise<UserHighScores> {
    const allUsers = await this.userRepo.getAll();
    const rpUsers = await Promise.all(
      allUsers.map(_ => this.rpUserService.getRPStatsForUser(_))
    );

    const USERS_TO_SELECT = 10;

    function rpStatsToUserWire(rpStats: UserRPStats, index: number): RPUser {
      return rpUserWire(allUsers[index]!, rpStats);
    }

    const [
      mostKills,
      mostDeaths,
      mostDamageGiven,
      mostDamageReceived,
      mostArrests,
      mostJailTime,
    ] = [
      take(
        orderBy(rpUsers, _ => _.kills.total, 'desc'),
        USERS_TO_SELECT
      ).map(rpStatsToUserWire),
      take(
        orderBy(rpUsers, _ => _.deaths.total, 'desc'),
        USERS_TO_SELECT
      ).map(rpStatsToUserWire),
      take(
        orderBy(rpUsers, _ => _.damage.damageGiven, 'desc'),
        USERS_TO_SELECT
      ).map(rpStatsToUserWire),
      take(
        orderBy(rpUsers, _ => _.damage.damageTaken, 'desc'),
        USERS_TO_SELECT
      ).map(rpStatsToUserWire),
      take(
        orderBy(rpUsers, _ => _.police.arrestsMade, 'desc'),
        USERS_TO_SELECT
      ).map(rpStatsToUserWire),
      take(
        orderBy(rpUsers, _ => _.police.timesArrested, 'desc'),
        USERS_TO_SELECT
      ).map(rpStatsToUserWire),
    ];

    return {
      mostKills,
      mostDeaths,
      mostDamageGiven,
      mostDamageReceived,
      mostArrests,
      mostJailTime,
      timestamp: Moment().unix(),
    };
  }

  @Get('gangs')
  async getGangHighScores() {
    return 'helloooo';
  }
}
