import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';
import {GamblingMachineEntity} from '../database/gambling-machine/gambling.entity';
import {GamblingMachineRepository} from '../database/gambling-machine/gambling.repository';

@Injectable()
export class GamblingMachinePipe implements PipeTransform {
  constructor(
    private readonly gamblingMachineRepo: GamblingMachineRepository
  ) {}

  async transform(gamblingMachineID: number): Promise<GamblingMachineEntity> {
    try {
      return await this.gamblingMachineRepo.findOneOrFail({
        id: gamblingMachineID,
      });
    } catch (e) {
      throw new NotFoundException('Gambling machine does not exist');
    }
  }
}
