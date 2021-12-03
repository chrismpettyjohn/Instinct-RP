import Moment from 'moment';
import {PropertyPipe} from './property.pipe';
import {PropertyOwnerGuard} from './property-owner.guard';
import {GetSession, HasSession} from '@instinct-api/session';
import {BidOnPropertyDTOImplementation} from './property.dto';
import {RPUserEntityStruct} from '../database/user/user.types';
import {RespondOnPropertyBidDTOImplementation} from './property.dto';
import {PropertyEntity} from '../database/property/properties/property.entity';
import {PropertyBidsRepository} from '../database/property/property-bids/property-bids.repository';
import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import {RPUserRepository} from '../database/user/user.repository';

@Controller('properties/:propertyID/bids')
@HasSession()
export class PropertyBidsController {
  constructor(
    private readonly propertyBidRepo: PropertyBidsRepository,
    private readonly userRepo: RPUserRepository
  ) {}

  @Post()
  async createPropertyBid(
    @Body() propertyDTO: BidOnPropertyDTOImplementation,
    @Param('propertyID', PropertyPipe) property: PropertyEntity,
    @GetSession() user: RPUserEntityStruct
  ): Promise<void> {
    if (property.userID === user.id!) {
      throw new BadRequestException('You already own this property!');
    }

    if (user.credits < propertyDTO.offer) {
      throw new BadRequestException("You don't have enough money");
    }

    await this.userRepo.update(
      {id: user.id!},
      {credits: Number(user.credits - propertyDTO.offer)}
    );

    await this.propertyBidRepo.create({
      ...propertyDTO,
      userID: user.id!,
      propertyID: property.id!,
      created_at: Moment().unix(),
    });
  }

  @Post(':bidID/response')
  @UseGuards(PropertyOwnerGuard)
  async respondToPropertyBid(
    @Param('bidID') bidID: number,
    @Body() responseDTO: RespondOnPropertyBidDTOImplementation
  ) {
    const propertyBid = await this.propertyBidRepo.findOneOrFail({id: bidID});

    if (!responseDTO.accepted) {
      await this.userRepo.update(
        {id: propertyBid.userID},
        {credits: Number(propertyBid.user!.credits + propertyBid.offer)}
      );
    }

    await this.propertyBidRepo.update(
      {id: bidID},
      {accepted: responseDTO.accepted ? 1 : 0}
    );
  }
}
