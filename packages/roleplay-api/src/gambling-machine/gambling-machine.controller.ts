import {HasSession} from '@instinct-api/session';
import {Controller, Get, Param} from '@nestjs/common';
import {GamblingMachinePipe} from './gambling-machine.pipe';
import {GamblingMachine} from '@instinct-plugin/roleplay-types';
import {gamblingMachineWire} from '../database/gambling-machine/gambling.wire';
import {GamblingMachineEntity} from '../database/gambling-machine/gambling.entity';
import {GamblingMachineRepository} from '../database/gambling-machine/gambling.repository';

@Controller('gambling-machines')
@HasSession()
export class GamblingMachineController {
  constructor(
    private readonly gamblingMachineRepo: GamblingMachineRepository
  ) {}

  @Get()
  async getFoods(): Promise<GamblingMachine[]> {
    const gamblingMachines = await this.gamblingMachineRepo.find();
    return gamblingMachines.map(gamblingMachineWire);
  }

  @Get(':gamblingMachineID')
  async getFoodByID(
    @Param('gamblingMachineID', GamblingMachinePipe)
    gamblingMachine: GamblingMachineEntity
  ): Promise<GamblingMachine> {
    return gamblingMachineWire(gamblingMachine);
  }
}
