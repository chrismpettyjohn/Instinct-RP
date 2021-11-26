import {WeaponEntity} from '../database/weapon/weapon.entity';
import {WeaponRepository} from '../database/weapon/weapon.repository';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class WeaponPipe implements PipeTransform {
  constructor(private readonly weaponRepo: WeaponRepository) {}

  async transform(weaponID: number): Promise<WeaponEntity> {
    try {
      return await this.weaponRepo.findOneOrFail({id: weaponID});
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Weapon does not exist');
    }
  }
}
