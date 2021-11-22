import {LawEntity} from '../database/law/law.entity';
import {LawRepository} from '../database/law/law.repository';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class LawPipe implements PipeTransform {
  constructor(private readonly lawRepo: LawRepository) {}

  async transform(lawID: number): Promise<LawEntity> {
    try {
      return await this.lawRepo.findOneOrFail({id: lawID});
    } catch (e) {
      throw new NotFoundException('Law does not exist');
    }
  }
}
