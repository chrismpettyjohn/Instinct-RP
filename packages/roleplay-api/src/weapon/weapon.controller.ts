import {WeaponPipe} from './weapon.pipe';
import {HasSession} from '@instinct-api/session';
import {weaponWire} from '../database/weapon/weapon.wire';
import {Weapon} from '@instinct-plugin/roleplay-types';
import {Controller, Get, Param} from '@nestjs/common';
import {WeaponEntity} from '../database/weapon/weapon.entity';
import {WeaponRepository} from '../database/weapon/weapon.repository';

@Controller('weapon')
@HasSession()
export class WeaponController {
  constructor(private readonly weaponRepo: WeaponRepository) {}

  @Get()
  async getWeapons(): Promise<Weapon[]> {
    const weaponOptions = await this.weaponRepo.find();
    return weaponOptions.map(weaponWire);
  }

  @Get(':weaponID')
  async getWeaponByID(
    @Param('weaponID', WeaponPipe) weapon: WeaponEntity
  ): Promise<Weapon> {
    return weaponWire(weapon);
  }
}
