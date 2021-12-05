import {Module} from '@nestjs/common';
import {DatabaseModule} from '../../database';
import {RPUserModule} from '../../user/user.module';
import {HighScoreController} from './high-score.controller';

@Module({
  imports: [DatabaseModule, RPUserModule],
  controllers: [HighScoreController],
})
export class UserHighScoreModule {}
