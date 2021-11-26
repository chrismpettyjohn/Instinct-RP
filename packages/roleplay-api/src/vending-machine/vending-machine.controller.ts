import {HasSession} from '@instinct-api/session';
import {VendingMachinePipe} from './vending-machine.pipe';
import {VendingMachine} from '@instinct-plugin/roleplay-types';
import {HasRPScope} from '../session/permission-scope.decorator';
import {VendingMachineDTOImplementation} from './vending-machine.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {vendingMachineWire} from '../database/vending-machine/vending-machine.wire';
import {VendingMachineEntity} from '../database/vending-machine/vending-machine.entity';
import {VendingMachineRepository} from '../database/vending-machine/vending-machine.repository';

@Controller('vending-machines')
@HasSession()
export class VendingMachineController {
  constructor(private readonly vendingMachineRepo: VendingMachineRepository) {}

  @Post()
  @HasRPScope('websiteManageVendingMachines')
  async createVendingMachine(
    @Body() vendingMachineDTO: VendingMachineDTOImplementation
  ): Promise<VendingMachine> {
    const newVendingMachine = await this.vendingMachineRepo.create({
      name: vendingMachineDTO.name,
      itemName: vendingMachineDTO.itemName,
      cost: vendingMachineDTO.cost,
      hunger: vendingMachineDTO.hungerRestored,
      energy: vendingMachineDTO.energyGained,
      health: vendingMachineDTO.healthGained,
    });
    return vendingMachineWire(newVendingMachine);
  }

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

  @Patch(':vendingMachineID')
  @HasRPScope('websiteManageVendingMachines')
  async updateVendingMachineByID(
    @Param('vendingMachineID', VendingMachinePipe)
    vendingMachine: VendingMachineEntity,
    @Body() vendingMachineDTO: VendingMachineDTOImplementation
  ) {
    await this.vendingMachineRepo.update(
      {id: vendingMachine.id!},
      {
        name: vendingMachineDTO.name,
        itemName: vendingMachineDTO.itemName,
        cost: vendingMachineDTO.cost,
        hunger: vendingMachineDTO.hungerRestored,
        energy: vendingMachineDTO.energyGained,
        health: vendingMachineDTO.healthGained,
      }
    );
  }

  @Delete(':vendingMachineID')
  @HasRPScope('websiteManageVendingMachines')
  async deleteVendingMachineByID(
    @Param('vendingMachineID', VendingMachinePipe)
    vendingMachine: VendingMachineEntity
  ) {
    await this.vendingMachineRepo.delete({id: vendingMachine.id!});
  }
}
