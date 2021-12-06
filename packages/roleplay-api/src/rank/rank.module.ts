import {Module} from '@nestjs/common';
import {RankService} from './rank.service';
import {RPUserModule} from '../user/user.module';
import {RankController} from './rank.controller';
import {SessionModule} from '@instinct-api/session';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule, SessionModule, RPUserModule],
  controllers: [RankController],
  providers: [RankService],
  exports: [RankService],
})
export class RankModule {}
