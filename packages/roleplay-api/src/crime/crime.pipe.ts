import {CrimeEntity} from '../database/crime/crime.entity';
import {CrimeRepository} from '../database/crime/crime.repository';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class CrimePipe implements PipeTransform {
  constructor(private readonly crimeRepo: CrimeRepository) {}

  async transform(crimeID: number): Promise<CrimeEntity> {
    try {
      return await this.crimeRepo.findOneOrFail({id: crimeID});
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Crime does not exist');
    }
  }
}
