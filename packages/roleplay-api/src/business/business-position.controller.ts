import {MoreThan} from 'typeorm';
import {HasSession} from '@instinct-api/session';
import {RPUserService} from '../user/user.service';
import {BusinessService} from './business.service';
import {Controller, Get, Post} from '@nestjs/common';
import {RoomRepository, UserRepository} from '@instinct-api/database';
import {BusinessPosition, RPUser} from '@instinct-plugin/roleplay-types';
import {businessPositionWire} from '../database/business/business-position.wire';
import {
  BusinessPositionRepository,
  BusinessRepository,
} from '../database/business';

@Controller('business-positions')
@HasSession()
export class BusinessPositionController {
  constructor(
    private readonly userRepo: UserRepository,
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

  @Post(':businessID/:positionID/accept')
  async acceptOpenPositions(): Promise<void> {
    // To Do
  }
}
