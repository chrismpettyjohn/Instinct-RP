import {uniqBy} from 'lodash';
import {BusinessDTO} from './business.dto';
import {BusinessPipe} from './business.pipe';
import {GetSession, HasScope, HasSession} from '@instinct-api/session';
import {
  Business,
  GovernmentBranch,
  RPUser,
  UserRPStats,
} from '@instinct-plugin/roleplay-types';
import {businessWire} from '../database/business/business.wire';
import {
  BusinessEntity,
  BusinessPositionRepository,
  BusinessRepository,
} from '../database/business';
import {
  PermissionStatus,
  RoomEntity,
  RoomEntityStruct,
  RoomRepository,
  UserEntityStruct,
  UserRepository,
} from '@instinct-api/database';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {RPUserEntityStruct} from '../database/user/user.types';
import {BusinessService} from './business.service';
import {IsGovernment} from '../database/business/business.types';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';

@Controller('businesses')
@HasSession()
export class BusinessController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roomRepo: RoomRepository,
    private readonly rpUserService: RPUserService,
    private readonly businessRepo: BusinessRepository,
    private readonly businessService: BusinessService,
    private readonly businessPositionRepo: BusinessPositionRepository
  ) {}

  @Post()
  @HasScope('websiteCreateBusiness' as any)
  async createBusiness(
    @Body() businessDTO: BusinessDTO,
    @GetSession() user: UserEntityStruct
  ): Promise<Business> {
    if (user.credits < businessDTO.investment + 100) {
      throw new BadRequestException(
        "You don't have enough money to create a business"
      );
    }

    const room: RoomEntityStruct = await this.roomRepo.findOneOrFail({
      id: businessDTO.homeRoom,
    });

    if (room.ownerID !== user.id!) {
      throw new BadRequestException("You don't own this room");
    }

    const newBusiness: BusinessEntity = await this.businessRepo.create({
      name: businessDTO.name,
      desc: businessDTO.desc,
      type: businessDTO.type,
      badge: businessDTO.badge,
      userID: user.id!,
      workRoom: businessDTO.homeRoom,
      isGovernment: IsGovernment.No,
      createdAt: +new Date(),
    });

    await Promise.all(
      businessDTO.positions.map((businessPosition, positionIndex) => {
        return this.businessPositionRepo.create({
          ...businessPosition,
          jobID: newBusiness.id!,
          governmentBranch: GovernmentBranch.None,
          jobRankID: positionIndex + 1, // HARD CODED
        });
      })
    );

    await this.userRepo.update(
      {id: user.id!},
      {
        credits: user.credits - (businessDTO.investment + 100),
      }
    );

    const businessObject: BusinessEntity =
      await this.businessRepo.findOneOrFail({id: newBusiness.id!});
    return businessWire(businessObject);
  }

  @Get()
  async getAllBusinesses(): Promise<Business[]> {
    const businesses: BusinessEntity[] = await this.businessRepo.find();

    const businessOwners: RPUserEntityStruct[] = uniqBy(
      businesses.map(_ => _.user! as any).flat(),
      'id'
    );

    const uniqBusinessOwners = uniqBy(businessOwners, 'id');

    const businessOwnerWires: RPUser[] = [];

    for (const businessOwner of uniqBusinessOwners) {
      const rpStats = await this.rpUserService.getRPStatsForUser(businessOwner);
      businessOwnerWires.push(rpUserWire(businessOwner, rpStats));
    }

    return businesses.map((business: BusinessEntity) => {
      return businessWire(business, [
        businessOwnerWires.find(_ => _.id === business.userID)!,
      ]);
    });
  }

  @Get(':businessID')
  async getBusinessByID(
    @Param('businessID', BusinessPipe) business: BusinessEntity
  ) {
    const businessMembers = await this.businessService.getUsersInBusiness(
      business
    );
    return businessWire(business, businessMembers);
  }

  @Patch(':businessID')
  @HasScope('websiteCreateBusiness' as any)
  async updateBusinessByID(
    @Param('businessID', BusinessPipe) business: BusinessEntity,
    @GetSession() user: RPUserEntityStruct,
    @Body() businessDTO: BusinessDTO
  ) {
    if (
      business.userID !== user.id! ||
      user.rank!.websiteManageBusiness !== PermissionStatus.Enabled
    ) {
      throw new ForbiddenException('You do not own this business');
    }

    const room = await this.roomRepo.findOneOrFail({id: business.workRoom});

    if (
      room?.ownerID !== user.id! ||
      user.rank!.websiteManageBusiness !== PermissionStatus.Enabled
    ) {
      throw new ForbiddenException('You do not own this room');
    }

    await this.businessRepo.update(
      {
        id: business.id!,
      },
      {
        name: businessDTO.name,
        desc: businessDTO.desc,
        badge: businessDTO.badge,
        workRoom: businessDTO.homeRoom,
      }
    );
  }

  @Delete(':businessID')
  @HasScope('websiteCreateBusiness' as any)
  async deleteBusinessByID(
    @Param('businessID', BusinessPipe) business: BusinessEntity,
    @GetSession() user: RPUserEntityStruct
  ) {
    if (
      business.userID !== user.id! &&
      user.rank!.websiteManageBusiness !== PermissionStatus.Enabled
    ) {
      throw new ForbiddenException('That is not your business');
    }

    await this.businessRepo.delete({id: business.id!});
  }
}
