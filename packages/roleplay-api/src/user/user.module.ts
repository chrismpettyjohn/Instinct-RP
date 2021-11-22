import {Module} from '@nestjs/common';
import {RPUserService} from './user.service';
import {DatabaseModule} from '../database/database.module';
import {SessionModule as BaseSessionModule} from '@instinct-api/session';

@Module({
  imports: [DatabaseModule, BaseSessionModule],
  providers: [RPUserService],
  exports: [RPUserService],
})
export class RPUserModule {}
