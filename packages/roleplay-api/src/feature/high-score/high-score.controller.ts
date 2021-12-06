import Moment from 'moment';
import {take, orderBy} from 'lodash';
import {HasSession} from '@instinct-api/session';
import {RPUserService} from '../../user/user.service';
import {rpUserWire} from '../../database/user/user.wire';
import {RPUserRepository} from '../../database/user/user.repository';
import {
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import {
  Gang,
  GangHighScores,
  RPUser,
  UserHighScores,
  UserRPStats,
} from '@instinct-plugin/roleplay-types';
import {GangRepository} from '../../database/gang';
import {GangService} from '../../gang/gang.service';

const USERS_TO_SELECT = 10;

const FOUR_HOURS = 3600 * 4;

@Controller('high-scores')
@HasSession()
@CacheTTL(FOUR_HOURS)
@UseInterceptors(CacheInterceptor)
export class HighScoreController {
  constructor(
    private readonly userRepo: RPUserRepository,
    private readonly rpUserService: RPUserService,
    private readonly gangRepo: GangRepository,
    private readonly gangService: GangService
  ) {}

  @Get('users')
  async getUserHighScores(): Promise<UserHighScores> {
    const allUsers = await this.userRepo.getAll();
    const rpUsers = await Promise.all(
      allUsers.map(_ => this.rpUserService.getRPStatsForUser(_))
    );

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
  async getGangHighScores(): Promise<GangHighScores> {
    const allGangs = await this.gangRepo.find();
    const gangWires: Gang[] = await Promise.all(
      allGangs.map(this.gangService.getWire)
    );
    const [mostKills, mostDeaths, highestScore, mostTurfs, mostHeists] = [
      take(
        orderBy(gangWires, _ => _.stats.kills, 'desc'),
        USERS_TO_SELECT
      ),
      take(
        orderBy(gangWires, _ => _.stats.deaths, 'desc'),
        USERS_TO_SELECT
      ),
      take(
        orderBy(gangWires, _ => _.stats.score, 'desc'),
        USERS_TO_SELECT
      ),
      take(
        orderBy(gangWires, _ => _.stats.turfs, 'desc'),
        USERS_TO_SELECT
      ),
      take(
        orderBy(gangWires, _ => _.stats.heists, 'desc'),
        USERS_TO_SELECT
      ),
    ];
    return {
      mostKills,
      mostDeaths,
      highestScore,
      mostTurfs,
      mostHeists,
      timestamp: Moment().unix(),
    };
  }
}
