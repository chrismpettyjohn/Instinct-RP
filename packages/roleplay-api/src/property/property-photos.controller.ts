import {PropertyPipe} from './property.pipe';
import {PropertyOwnerGuard} from './property-owner.guard';
import {GetSession, HasSession} from '@instinct-api/session';
import {PropertyPhotoDTOImplementation} from './property.dto';
import {RPUserEntityStruct} from '../database/user/user.types';
import {PropertyEntity} from '../database/property/properties/property.entity';
import {PropertyPhotosRepository} from '../database/property/property-photos/property-photos.repository';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('properties/:propertyID/photos')
@HasSession()
export class PropertyPhotosController {
  constructor(private readonly propertyPhotoRepo: PropertyPhotosRepository) {}

  @Post()
  async addPropertyPhoto(
    @Body() propertyPhotoDTO: PropertyPhotoDTOImplementation,
    @Param('propertyID', PropertyPipe) property: PropertyEntity,
    @GetSession() user: RPUserEntityStruct
  ): Promise<void> {
    await this.propertyPhotoRepo.create({
      ...propertyPhotoDTO,
      propertyID: property.id!,
      isPrimary: propertyPhotoDTO.isPrimary ? 1 : 0,
    });
  }

  @Patch(':photoID')
  @UseGuards(PropertyOwnerGuard)
  async updatePropertyPhotoByID(
    @Param('bidID') photoID: number,
    @Body() propertyPhotoDTO: PropertyPhotoDTOImplementation
  ) {
    await this.propertyPhotoRepo.update(
      {id: photoID},
      {
        ...propertyPhotoDTO,
        isPrimary: propertyPhotoDTO.isPrimary ? 1 : 0,
      }
    );
  }

  @Delete(':photoID')
  @UseGuards(PropertyOwnerGuard)
  async deletePropertyPhotoByID(@Param('bidID') photoID: number) {
    await this.propertyPhotoRepo.delete({id: photoID});
  }
}
