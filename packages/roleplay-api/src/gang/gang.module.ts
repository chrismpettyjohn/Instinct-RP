import {GangPipe} from './gang.pipe';
import {Module} from '@nestjs/common';
import {GangService} from './gang.service';
import {GangController} from './gang.controller';
import {RPUserModule} from '../user/user.module';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule, RPUserModule],
  controllers: [GangController],
  providers: [GangService, GangPipe],
  exports: [GangService, GangPipe],
})
export class GangModule {}
