import Moment from 'moment';
import {uniqBy} from 'lodash';
import {MoreThan} from 'typeorm';
import {BountyPipe} from './bounty.pipe';
import {HasSession} from '@instinct-api/session';
import {Bounty} from '@instinct-plugin/roleplay-types';
import {bountyWire} from '../database/bounty/bounty.wire';
import {BountyEntity} from '../database/bounty/bounty.entity';
import {BountyRepository} from '../database/bounty/bounty.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {BountyDTOImplementation} from './bounty.dto';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';
import {HasRPScope} from '../session/permission-scope.decorator';
import {GetSession} from '@instinct-api/session';
import {RPUserEntity} from '../database/user/user.entity';

@Controller('bounties')
@HasSession()
export class BountyController {
  constructor(
    private readonly bountyRepo: BountyRepository,
    private readonly rpUserService: RPUserService
  ) {}

  @Post()
  @HasRPScope('websiteManageBounties')
  async createBounty(
    @Body() bountyDTO: BountyDTOImplementation,
    @GetSession() user: RPUserEntity
  ): Promise<Bounty> {
    const newBounty = await this.bountyRepo.create({
      ...bountyDTO,
      addedByUserID: user.id!,
      addedAt: Moment().unix(),
    });

    const bountyWithRelations = await this.bountyRepo.findOneOrFail({
      id: newBounty.id!,
    });

    const [targetUserStats, addedUserStats] = await Promise.all([
      this.rpUserService.getRPStatsForUser(bountyWithRelations.targetUser!),
      this.rpUserService.getRPStatsForUser(bountyWithRelations.addedByUser!),
    ]);

    return bountyWire(
      bountyWithRelations,
      rpUserWire(bountyWithRelations.targetUser!, targetUserStats),
      rpUserWire(bountyWithRelations.addedByUser!, addedUserStats)
    );
  }

  @Get()
  async getBounties(): Promise<Bounty[]> {
    const currentTimestamp = Moment().unix();
    const bounties = await this.bountyRepo.find({
      expiresAt: MoreThan(currentTimestamp),
    });

    const usersToFetch: RPUserEntity[] = [];

    for (const bounty of bounties) {
      usersToFetch.push(bounty.targetUser!);
      usersToFetch.push(bounty.addedByUser!);
    }

    const uniqueUsersToFetch = uniqBy(usersToFetch, 'id');

    const userRPStats = await Promise.all(
      uniqueUsersToFetch.map(_ => this.rpUserService.getRPStatsForUser(_))
    );

    return bounties.map(bounty => {
      const [targetUserIndex, addedUserIndex] = [
        uniqueUsersToFetch.findIndex(_ => _.id === bounty.targetUserID),
        uniqueUsersToFetch.findIndex(_ => _.id === bounty.addedByUserID),
      ];

      const [targetUser, addedUser] = [
        rpUserWire(bounty.targetUser!, userRPStats[targetUserIndex]),
        rpUserWire(bounty.addedByUser!, userRPStats[addedUserIndex]),
      ];

      return bountyWire(bounty, targetUser, addedUser);
    });
  }

  @Get(':bountyID')
  async getBountyByID(
    @Param('bountyID', BountyPipe) bounty: BountyEntity
  ): Promise<Bounty> {
    const [targetUser, addedUser] = await Promise.all([
      this.rpUserService.getRPStatsForUser(bounty.targetUser!),
      this.rpUserService.getRPStatsForUser(bounty.addedByUser!),
    ]);

    return bountyWire(
      bounty,
      rpUserWire(bounty.targetUser!, targetUser),
      rpUserWire(bounty.addedByUser!, addedUser)
    );
  }

  @Patch(':bountyID')
  @HasRPScope('websiteManageBounties')
  async updateBountyByID(
    @Param('bountyID', BountyPipe) bounty: BountyEntity,
    @Body() bountyDTO: BountyDTOImplementation
  ) {
    await this.bountyRepo.update({id: bounty.id!}, bountyDTO);
  }

  @Delete(':bountyID')
  @HasRPScope('websiteManageBounties')
  async deleteBountyByID(@Param('bountyID', BountyPipe) bounty: BountyEntity) {
    await this.bountyRepo.delete({id: bounty.id!});
  }
}
