import {GangEntity, GangRepository} from '../database/gang';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class GangPipe implements PipeTransform {
  constructor(private readonly gangRepo: GangRepository) {}

  async transform(gangID: number): Promise<GangEntity> {
    try {
      return await this.gangRepo.findOneOrFail({id: gangID});
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Gang does not exist');
    }
  }
}
