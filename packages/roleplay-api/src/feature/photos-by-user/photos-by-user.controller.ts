import {Photo} from '@instinct-prj/interface';
import {HasSession} from '@instinct-api/session';
import {Controller, Get, Param} from '@nestjs/common';
import {PhotosByUserPipe} from './photos-by-user.pipe';
import {PhotoEntityStruct, photoWire} from '@instinct-api/database';

@Controller('photos/by-user/:username')
@HasSession()
export class PhotosByUserController {
  @Get()
  getPhotosByUser(
    @Param('username', PhotosByUserPipe) photos: PhotoEntityStruct[]
  ): Photo[] {
    return photos.map(photoWire);
  }
}
