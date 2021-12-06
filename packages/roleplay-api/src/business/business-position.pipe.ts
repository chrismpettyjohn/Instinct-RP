import {
  BusinessPositionEntity,
  BusinessPositionRepository,
} from '../database/business';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class BusinessPositionPipe implements PipeTransform {
  constructor(
    private readonly businessPositionRepo: BusinessPositionRepository
  ) {}

  async transform(businessPositionID: number): Promise<BusinessPositionEntity> {
    try {
      return await this.businessPositionRepo.findOneOrFail({
        id: businessPositionID,
      });
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Business Position does not exist');
    }
  }
}
