import {VendingMachinePipe} from './vending-machine.pipe';
import {Module} from '@nestjs/common';
import {VendingMachineController} from './vending-machine.controller';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VendingMachineController],
  providers: [VendingMachinePipe],
  exports: [VendingMachinePipe],
})
export class VendingMachineModule {}
