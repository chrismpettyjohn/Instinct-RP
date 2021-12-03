import {Module} from '@nestjs/common';
import {PhotosByUserPipe} from './photos-by-user.pipe';
import {SessionModule} from '../../session/session.module';
import {DatabaseModule} from '../../database/database.module';
import {PhotosByUserController} from './photos-by-user.controller';

@Module({
  imports: [DatabaseModule, SessionModule],
  controllers: [PhotosByUserController],
  providers: [PhotosByUserPipe],
  exports: [PhotosByUserPipe],
})
export class PhotosByUserModule {}
