import {Module} from '@nestjs/common';
import {PropertyPipe} from './property.pipe';
import {PropertyController} from './property.controller';
import {SessionModule} from '../session/session.module';
import {DatabaseModule} from '../database/database.module';
import {PropertyBidsController} from './property-bids.controller';
import {PropertyPhotosController} from './property-photos.controller';

@Module({
  imports: [DatabaseModule, SessionModule],
  controllers: [
    PropertyController,
    PropertyBidsController,
    PropertyPhotosController,
  ],
  providers: [PropertyPipe],
  exports: [PropertyPipe],
})
export class PropertyModule {}
