import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';
import {VendingMachineEntity} from '../database/vending-machine/vending-machine.entity';
import {VendingMachineRepository} from '../database/vending-machine/vending-machine.repository';

@Injectable()
export class VendingMachinePipe implements PipeTransform {
  constructor(private readonly vendingMachineRepo: VendingMachineRepository) {}

  async transform(vendingMachineID: number): Promise<VendingMachineEntity> {
    try {
      return await this.vendingMachineRepo.findOneOrFail({
        id: vendingMachineID,
      });
    } catch (e) {
      throw new NotFoundException('Vending Machine does not exist');
    }
  }
}
