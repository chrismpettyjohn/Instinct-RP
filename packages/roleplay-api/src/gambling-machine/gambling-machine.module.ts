import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {GamblingMachinePipe} from './gambling-machine.pipe';
import {GamblingMachineController} from './gambling-machine.controller';
import {SessionModule} from '../session/session.module';

@Module({
  imports: [DatabaseModule, SessionModule],
  controllers: [GamblingMachineController],
  providers: [GamblingMachinePipe],
  exports: [GamblingMachinePipe],
})
export class GamblingMachineModule {}
