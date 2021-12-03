import {Module} from '@nestjs/common';
import {RPRoomPipe} from './rp-room.pipe';
import {RPRoomController} from './rp-room.controller';
import {SessionModule} from '../session/session.module';
import {DatabaseModule} from '../database/database.module';
import {RPRoomsByUsernamePipe} from './rp-rooms-by-username.pipe';

@Module({
  imports: [DatabaseModule, SessionModule],
  controllers: [RPRoomController],
  providers: [RPRoomPipe, RPRoomsByUsernamePipe],
  exports: [RPRoomPipe, RPRoomsByUsernamePipe],
})
export class RPRoomModule {}
