import {Module} from '@nestjs/common';
import {PropertyPipe} from './property.pipe';
import {RPUserModule} from '../user/user.module';
import {PropertyService} from './property.service';
import {SessionModule} from '../session/session.module';
import {PropertyController} from './property.controller';
import {PropertyOwnerGuard} from './property-owner.guard';
import {DatabaseModule} from '../database/database.module';
import {PropertyBidsController} from './property-bids.controller';
import {PropertyByUsernamePipe} from './property-by-username.pipe';
import {PropertyPhotosController} from './property-photos.controller';

@Module({
  imports: [DatabaseModule, SessionModule, RPUserModule],
  controllers: [
    PropertyController,
    PropertyBidsController,
    PropertyPhotosController,
  ],
  providers: [
    PropertyPipe,
    PropertyService,
    PropertyOwnerGuard,
    PropertyByUsernamePipe,
  ],
  exports: [
    PropertyPipe,
    PropertyService,
    PropertyOwnerGuard,
    PropertyByUsernamePipe,
  ],
})
export class PropertyModule {}
