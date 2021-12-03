import Moment from 'moment';
import {uniqBy} from 'lodash';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';
import {RoomRepository} from '@instinct-api/database';
import {Property} from '@instinct-plugin/roleplay-types';
import {RPUserEntityStruct} from '../database/user/user.types';
import {Injectable, BadRequestException} from '@nestjs/common';
import {RPUserRepository} from '../database/user/user.repository';
import {propertyWire} from '../database/property/properties/property.wire';
import {PropertyEntity} from '../database/property/properties/property.entity';
import {PropertyRepository} from '../database/property/properties/property.repository';
import {PropertyBidsRepository} from '../database/property/property-bids/property-bids.repository';
import {PropertyPhotosRepository} from '../database/property/property-photos/property-photos.repository';

@Injectable()
export class PropertyService {
  constructor(
    private readonly roomRepo: RoomRepository,
    private readonly rpUserService: RPUserService,
    private readonly propertyRepo: PropertyRepository,
    private readonly propertyBidRepo: PropertyBidsRepository,
    private readonly userRepo: RPUserRepository,
    private readonly propertyPhotoRepo: PropertyPhotosRepository
  ) {}

  async getWireForProperty(property: PropertyEntity): Promise<Property> {
    const allUsers = [property.user!, ...property.bids!.map(_ => _.user!)];
    if (property.customer) allUsers.push(property.customer);

    const uniqUsers = uniqBy(allUsers, 'id');

    const uniqUserStats = await Promise.all(
      uniqUsers.map(_ => this.rpUserService.getRPStatsForUser(_))
    );

    return propertyWire(
      property,
      uniqUsers.map((_, index) => rpUserWire(_, uniqUserStats[index]))
    );
  }

  async buyProperty(
    user: RPUserEntityStruct,
    property: PropertyEntity,
    cost: number
  ) {
    if (property.userID === user.id!) {
      throw new BadRequestException('You already own this property!');
    }

    if (user.credits < cost) {
      throw new BadRequestException("You don't have enough money");
    }

    await this.propertyRepo.update(
      {id: property.id!},
      {
        soldAt: Moment().unix(),
        soldFor: cost,
        customerID: user.id!,
      }
    );

    await this.roomRepo.update({id: property.roomID}, {ownerID: user.id!});

    for (const bid of property.bids!) {
      await this.propertyBidRepo.update({id: bid.id!}, {accepted: 0});
      await this.refundBid(bid.user!, bid.offer);
    }
  }

  async refundBid(user: RPUserEntityStruct, bidAmount: number) {
    await this.userRepo.update(
      {id: user.id!},
      {credits: Number(user.credits + bidAmount)}
    );
  }

  async setPhotos(propertyID: number, photoIDs: number[]) {
    const currentPhotos = await this.propertyPhotoRepo.find({
      propertyID,
    });

    const photosToRemove = currentPhotos.filter(
      _ => !photoIDs.includes(_.photoID!)
    );

    await Promise.all(
      photosToRemove.map(_ => this.propertyPhotoRepo.delete({id: _.id!}))
    );

    const photosToAdd = photoIDs.filter(
      _ => !currentPhotos.find(cur => cur.photoID === _)
    );

    console.log(photosToAdd);

    await Promise.all(
      photosToAdd.map((_, index) =>
        this.propertyPhotoRepo.create({
          propertyID,
          photoID: _,
          isPrimary: index === 0 ? 1 : 0,
        })
      )
    );
  }
}
