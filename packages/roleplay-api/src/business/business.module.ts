import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database';
import {BusinessPipe} from './business.pipe';
import {SessionModule} from '../session/session.module';
import {BusinessController} from './business.controller';
import {BusinessService} from './business.service';
import {RPUserModule} from '../user/user.module';
import {BusinessPositionController} from './business-position.controller';
import {BusinessPositionPipe} from './business-position.pipe';

@Module({
  imports: [DatabaseModule, RPUserModule, SessionModule],
  controllers: [BusinessController, BusinessPositionController],
  providers: [BusinessPipe, BusinessService, BusinessPositionPipe],
  exports: [BusinessPipe, BusinessService, BusinessPositionPipe],
})
export class BusinessModule {}
