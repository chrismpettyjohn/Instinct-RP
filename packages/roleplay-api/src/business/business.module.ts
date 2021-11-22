import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database';
import {BusinessPipe} from './business.pipe';
import {BusinessController} from './business.controller';
import {BusinessService} from './business.service';
import {RPUserModule} from '../user/user.module';

@Module({
  imports: [DatabaseModule, RPUserModule],
  controllers: [BusinessController],
  providers: [BusinessPipe, BusinessService],
  exports: [BusinessPipe, BusinessService],
})
export class BusinessModule {}
