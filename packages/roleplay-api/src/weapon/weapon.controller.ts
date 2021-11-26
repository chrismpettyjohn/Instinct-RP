import {WeaponPipe} from './weapon.pipe';
import {HasSession} from '@instinct-api/session';
import {WeaponDTOImplementation} from './weapon.dto';
import {Weapon} from '@instinct-plugin/roleplay-types';
import {weaponWire} from '../database/weapon/weapon.wire';
import {WeaponEntity} from '../database/weapon/weapon.entity';
import {HasRPScope} from '../session/permission-scope.decorator';
import {WeaponRepository} from '../database/weapon/weapon.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('weapon')
@HasSession()
export class WeaponController {
  constructor(private readonly weaponRepo: WeaponRepository) {}

  @Post()
  @HasRPScope('websiteManageWeapons')
  async createWeapon(
    @Body() weaponDTO: WeaponDTOImplementation
  ): Promise<Weapon> {
    const newWeapon = await this.weaponRepo.create({
      ...weaponDTO,
      damage: `${weaponDTO.minDamage};${weaponDTO.maxDamage}`,
      cooldown: weaponDTO.cooldownTime,
    });
    return weaponWire(newWeapon);
  }

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

  @Patch(':weaponID')
  @HasRPScope('websiteManageWeapons')
  async updateWeaponByID(
    @Param('weaponID', WeaponPipe) weapon: WeaponEntity,
    @Body() weaponDTO: WeaponDTOImplementation
  ) {
    await this.weaponRepo.update(
      {id: weapon.id!},
      {
        ...weaponDTO,
        damage: `${weaponDTO.minDamage};${weaponDTO.maxDamage}`,
        cooldown: weaponDTO.cooldownTime,
      }
    );
  }

  @Delete(':weaponID')
  @HasRPScope('websiteManageWeapons')
  async deleteWeaponByID(@Param('weaponID', WeaponPipe) weapon: WeaponEntity) {
    await this.weaponRepo.delete({id: weapon.id!});
  }
}
