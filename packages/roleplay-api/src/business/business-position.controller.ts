import {MoreThan} from 'typeorm';
import {RPUserService} from '../user/user.service';
import {BusinessService} from './business.service';
import {RPUserEntity} from '../database/user/user.entity';
import {GetSession, HasSession} from '@instinct-api/session';
import {BusinessPositionPipe} from './business-position.pipe';
import {RoomRepository, UserRepository} from '@instinct-api/database';
import {BusinessPosition, RPUser} from '@instinct-plugin/roleplay-types';
import {
  Controller,
  Get,
  Param,
  Post,
  BadRequestException,
} from '@nestjs/common';
import {businessPositionWire} from '../database/business/business-position.wire';
import {
  BusinessPositionEntity,
  BusinessPositionRepository,
  BusinessRepository,
} from '../database/business';
import {UserRPStatRepository} from '../database/user';

@Controller('business-positions')
@HasSession()
export class BusinessPositionController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly rpStatsRepo: UserRPStatRepository,
    private readonly roomRepo: RoomRepository,
    private readonly rpUserService: RPUserService,
    private readonly businessRepo: BusinessRepository,
    private readonly businessService: BusinessService,
    private readonly businessPositionRepo: BusinessPositionRepository
  ) {}

  @Get()
  async getOpenPositions(): Promise<BusinessPosition[]> {
    const openPositions = await this.businessPositionRepo.find({
      openPositions: MoreThan(0),
    });
    const usersInPosition: Array<RPUser[]> = await Promise.all(
      openPositions.map(_ => this.businessService.getUsersInPosition(_))
    );
    return openPositions.map((openPosition, index) => {
      return businessPositionWire(openPosition, usersInPosition[index]);
    });
  }

  @Post(':businessPosition/accept')
  async acceptOpenPositions(
    @GetSession() user: RPUserEntity,
    @Param('businessPosition', BusinessPositionPipe)
    businessPosition: BusinessPositionEntity
  ): Promise<void> {
    if (businessPosition.openPositions === 0) {
      throw new BadRequestException(
        'There are no vacant positions for this job'
      );
    }

    await this.businessPositionRepo.update(
      {id: businessPosition.id!},
      {openPositions: businessPosition.openPositions - 1}
    );
    await this.rpStatsRepo.update(
      {id: user.id!},
      {
        jobData: `${businessPosition.jobID};${businessPosition.jobRankID};0;0`,
      }
    );
  }
}
