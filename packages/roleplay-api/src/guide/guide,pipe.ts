import {GuideEntity} from '../database/guide/guide.entity';
import {GuideRepository} from '../database/guide/guide.repository';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class GuidePipe implements PipeTransform {
  constructor(private readonly guideRepo: GuideRepository) {}

  async transform(guideID: number): Promise<GuideEntity> {
    try {
      return await this.guideRepo.findOneOrFail({id: guideID});
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Guide does not exist');
    }
  }
}
