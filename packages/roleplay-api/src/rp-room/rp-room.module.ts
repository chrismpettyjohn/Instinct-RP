import {Module} from '@nestjs/common';
import {RPRoomPipe} from './rp-room.pipe';
import {RPRoomController} from './rp-room.controller';
import {SessionModule} from '../session/session.module';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule, SessionModule],
  controllers: [RPRoomController],
  providers: [RPRoomPipe],
  exports: [RPRoomPipe],
})
export class RPRoomModule {}
