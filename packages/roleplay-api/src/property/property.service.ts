import {uniqBy} from 'lodash';
import {Injectable} from '@nestjs/common';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';
import {Property} from '@instinct-plugin/roleplay-types';
import {propertyWire} from '../database/property/properties/property.wire';
import {PropertyEntity} from '../database/property/properties/property.entity';

@Injectable()
export class PropertyService {
  constructor(private readonly rpUserService: RPUserService) {}

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
}
