import {CrimePipe} from './crime.pipe';
import {CrimeModule} from './crime.module';
import {HasSession} from '@instinct-api/session';
import {Crime} from '@instinct-plugin/roleplay-types';
import {Controller, Get, Param} from '@nestjs/common';
import {crimeWire} from '../database/crime/crime.wire';
import {CrimeEntity} from '../database/crime/crime.entity';
import {CrimeRepository} from '../database/crime/crime.repository';

@Controller('crimes')
@HasSession()
export class CrimeController {
  constructor(private readonly crimeRepo: CrimeRepository) {}

  @Get()
  async getFoods(): Promise<Crime[]> {
    const crimes = await this.crimeRepo.find();
    return crimes.map(crimeWire);
  }

  @Get(':crimeID')
  async getFoodByID(
    @Param('crimeID', CrimePipe) crime: CrimeEntity
  ): Promise<CrimeModule> {
    return crimeWire(crime);
  }
}
