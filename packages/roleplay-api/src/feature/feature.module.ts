import {Module} from '@nestjs/common';
import {RPProfileModule} from './rp-profile';
import {UserHighScoreModule} from './high-score/high-score.module';

@Module({
  imports: [UserHighScoreModule, RPProfileModule],
  exports: [UserHighScoreModule, RPProfileModule],
})
export class FeatureModule {}
