import Moment from 'moment';
import {IsNull} from 'typeorm';
import {PropertyPipe} from './property.pipe';
import {PropertyModule} from './property.module';
import {PropertyService} from './property.service';
import {Property} from '@instinct-plugin/roleplay-types';
import {PropertyDTOImplementation} from './property.dto';
import {PropertyOwnerGuard} from './property-owner.guard';
import {GetSession, HasSession} from '@instinct-api/session';
import {RPUserEntityStruct} from '../database/user/user.types';
import {PropertyEntity} from '../database/property/properties/property.entity';
import {PropertyRepository} from '../database/property/properties/property.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {PropertyByUsernamePipe} from './property-by-username.pipe';

@Controller('properties')
@HasSession()
export class PropertyController {
  constructor(
    private readonly propertyRepo: PropertyRepository,
    private propertyService: PropertyService
  ) {}

  @Post()
  async createProperty(
    @Body() propertyDTO: PropertyDTOImplementation,
    @GetSession() user: RPUserEntityStruct
  ): Promise<Property> {
    const newProperty = await this.propertyRepo.create({
      ...propertyDTO,
      userID: user.id!,
      listedAt: Moment().unix(),
    });

    await this.propertyService.setPhotos(newProperty.id!, propertyDTO.photoIDs);

    return this.propertyService.getWireForProperty(newProperty);
  }

  @Get()
  async getProperties(): Promise<Property[]> {
    const properties = await this.propertyRepo.find({
      soldAt: IsNull(),
    });
    return Promise.all(
      properties.map(_ => this.propertyService.getWireForProperty(_))
    );
  }

  @Get('by-user/:username')
  async getPropertiesByUsername(
    @Param('username', PropertyByUsernamePipe) properties: PropertyEntity[]
  ): Promise<Property[]> {
    return Promise.all(
      properties.map(_ => this.propertyService.getWireForProperty(_))
    );
  }

  @Get(':propertyID')
  async getPropertyByID(
    @Param('propertyID', PropertyPipe) property: PropertyEntity
  ): Promise<PropertyModule> {
    return this.propertyService.getWireForProperty(property);
  }

  @Patch(':propertyID')
  @UseGuards(PropertyOwnerGuard)
  async updatePropertyByID(
    @Param('propertyID', PropertyPipe) property: PropertyEntity,
    @Body() propertyDTO: PropertyDTOImplementation
  ) {
    await this.propertyRepo.update(
      {id: property.id!},
      {buyNowPrice: propertyDTO.buyNowPrice}
    );
    await this.propertyService.setPhotos(property.id!, propertyDTO.photoIDs);
  }

  @Delete(':propertyID')
  @UseGuards(PropertyOwnerGuard)
  async deletePropertyByID(
    @Param('propertyID', PropertyPipe) property: PropertyEntity
  ) {
    await this.propertyRepo.delete({id: property.id!});
  }
}
