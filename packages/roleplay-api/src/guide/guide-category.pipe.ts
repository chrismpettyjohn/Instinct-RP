import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';
import {GuideCategoryEntity} from '../database/guide/guide-category.entity';
import {GuideCategoryRepository} from '../database/guide/guide-category.repository';

@Injectable()
export class GuideCategoryPipe implements PipeTransform {
  constructor(private readonly guideCategoryRepo: GuideCategoryRepository) {}

  async transform(guideCategoryID: number): Promise<GuideCategoryEntity> {
    try {
      return await this.guideCategoryRepo.findOneOrFail({id: guideCategoryID});
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Guide Category does not exist');
    }
  }
}
