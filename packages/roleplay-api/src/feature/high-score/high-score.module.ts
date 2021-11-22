import {Module} from '@nestjs/common';
import {DatabaseModule} from '../../database';
import {UserHighScoreController} from './high-score.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserHighScoreController],
})
export class UserHighScoreModule {}
