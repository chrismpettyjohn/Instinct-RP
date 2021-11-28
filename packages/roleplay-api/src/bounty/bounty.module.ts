import {Module} from '@nestjs/common';
import {BountyPipe} from './bounty.pipe';
import {RPUserModule} from '../user/user.module';
import {BountyController} from './bounty.controller';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule, RPUserModule],
  controllers: [BountyController],
  providers: [BountyPipe],
  exports: [BountyPipe],
})
export class BountyModule {}
