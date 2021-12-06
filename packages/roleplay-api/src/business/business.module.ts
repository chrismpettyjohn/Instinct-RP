import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database';
import {BusinessPipe} from './business.pipe';
import {BusinessController} from './business.controller';
import {BusinessService} from './business.service';
import {RPUserModule} from '../user/user.module';
import {BusinessPositionController} from './business-position.controller';

@Module({
  imports: [DatabaseModule, RPUserModule],
  controllers: [BusinessController, BusinessPositionController],
  providers: [BusinessPipe, BusinessService],
  exports: [BusinessPipe, BusinessService],
})
export class BusinessModule {}
