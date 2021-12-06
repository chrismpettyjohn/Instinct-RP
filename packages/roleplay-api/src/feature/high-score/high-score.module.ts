import {Module} from '@nestjs/common';
import {DatabaseModule} from '../../database';
import {GangModule} from '../../gang/gang.module';
import {RPUserModule} from '../../user/user.module';
import {HighScoreController} from './high-score.controller';

@Module({
  imports: [DatabaseModule, RPUserModule, GangModule],
  controllers: [HighScoreController],
})
export class UserHighScoreModule {}
