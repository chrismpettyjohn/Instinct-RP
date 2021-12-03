import {Module} from '@nestjs/common';
import {RPProfileModule} from './rp-profile';
import {UserHighScoreModule} from './high-score/high-score.module';
import {PhotosByUserModule} from './photos-by-user/photos-by-user.module';

@Module({
  imports: [UserHighScoreModule, RPProfileModule, PhotosByUserModule],
  exports: [UserHighScoreModule, RPProfileModule, PhotosByUserModule],
})
export class FeatureModule {}
