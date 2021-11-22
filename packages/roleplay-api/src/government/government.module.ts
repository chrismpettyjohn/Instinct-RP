import {LawPipe} from './law.pipe';
import {Module} from '@nestjs/common';
import {LawService} from './law.service';
import {LawController} from './law.controller';
import {RPUserModule} from '../user/user.module';
import {PoliticalPartyPipe} from './political-party.pipe';
import {DatabaseModule} from '../database/database.module';
import {BusinessModule} from '../business/business.module';
import {GovernmentController} from './government.controller';
import {PoliticalPartyService} from './political-party.service';
import {PoliticalPartyController} from './political-party.controller';

@Module({
  imports: [DatabaseModule, BusinessModule, RPUserModule],
  controllers: [GovernmentController, LawController, PoliticalPartyController],
  providers: [LawService, LawPipe, PoliticalPartyPipe, PoliticalPartyService],
  exports: [LawService, LawPipe, PoliticalPartyPipe, PoliticalPartyService],
})
export class GovernmentModule {}
