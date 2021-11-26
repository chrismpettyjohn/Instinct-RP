import {HasSession} from '@instinct-api/session';
import {Controller, Get, Param} from '@nestjs/common';
import {VendingMachinePipe} from './vending-machine.pipe';
import {VendingMachine} from '@instinct-plugin/roleplay-types';
import {vendingMachineWire} from '../database/vending-machine/vending-machine.wire';
import {VendingMachineEntity} from '../database/vending-machine/vending-machine.entity';
import {VendingMachineRepository} from '../database/vending-machine/vending-machine.repository';

@Controller('vending-machines')
@HasSession()
export class VendingMachineController {
  constructor(private readonly vendingMachineRepo: VendingMachineRepository) {}

  @Get()
  async getVendingMachines(): Promise<VendingMachine[]> {
    const vendingMachines = await this.vendingMachineRepo.find();
    return vendingMachines.map(vendingMachineWire);
  }

  @Get(':vendingMachineID')
  async getFoodByID(
    @Param('vendingMachineID', VendingMachinePipe)
    vendingMachine: VendingMachineEntity
  ): Promise<VendingMachine> {
    return vendingMachineWire(vendingMachine);
  }
}
