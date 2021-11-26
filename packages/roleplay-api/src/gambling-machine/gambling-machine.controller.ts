import {HasSession} from '@instinct-api/session';
import {GamblingMachinePipe} from './gambling-machine.pipe';
import {GamblingMachine} from '@instinct-plugin/roleplay-types';
import {HasRPScope} from '../session/permission-scope.decorator';
import {GamblingMachineDTOImplementation} from './gambling-machine.dto';
import {gamblingMachineWire} from '../database/gambling-machine/gambling.wire';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {GamblingMachineEntity} from '../database/gambling-machine/gambling.entity';
import {GamblingMachineRepository} from '../database/gambling-machine/gambling.repository';

@Controller('gambling-machines')
@HasSession()
export class GamblingMachineController {
  constructor(
    private readonly gamblingMachineRepo: GamblingMachineRepository
  ) {}

  @Post()
  async createGamblingMachine(
    @Body() gamblingMachineDTO: GamblingMachineDTOImplementation
  ): Promise<GamblingMachine> {
    const newGamblingMachine = await this.gamblingMachineRepo.create(
      gamblingMachineDTO
    );
    return gamblingMachineWire(newGamblingMachine);
  }

  @Get()
  async getGamblingMachines(): Promise<GamblingMachine[]> {
    const gamblingMachines = await this.gamblingMachineRepo.find();
    return gamblingMachines.map(gamblingMachineWire);
  }

  @Get(':gamblingMachineID')
  async getGamblingMachineByID(
    @Param('gamblingMachineID', GamblingMachinePipe)
    gamblingMachine: GamblingMachineEntity
  ): Promise<GamblingMachine> {
    return gamblingMachineWire(gamblingMachine);
  }

  @Patch(':gamblingMachineID')
  @HasRPScope('websiteManageGambling')
  async updateGamblingMachineByID(
    @Param('gamblingMachineID', GamblingMachinePipe)
    gamblingMachine: GamblingMachineEntity,
    @Body() gamblingMachineDTO: GamblingMachineDTOImplementation
  ) {
    await this.gamblingMachineRepo.update(
      {id: gamblingMachine.id!},
      gamblingMachineDTO
    );
  }

  @Delete(':gamblingMachineID')
  @HasRPScope('websiteManageGambling')
  async deleteGamblingMachineByID(
    @Param('gamblingMachineID', GamblingMachinePipe)
    gamblingMachine: GamblingMachineEntity
  ) {
    await this.gamblingMachineRepo.delete({id: gamblingMachine.id!});
  }
}
