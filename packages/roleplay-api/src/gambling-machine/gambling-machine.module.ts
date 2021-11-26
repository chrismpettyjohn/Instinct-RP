import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {GamblingMachinePipe} from './gambling-machine.pipe';
import {GamblingMachineController} from './gambling-machine.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [GamblingMachineController],
  providers: [GamblingMachinePipe],
  exports: [GamblingMachinePipe],
})
export class GamblingMachineModule {}
