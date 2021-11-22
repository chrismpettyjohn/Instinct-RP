import {BusinessEntity, BusinessRepository} from '../database/business';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class BusinessPipe implements PipeTransform {
  constructor(private readonly businessRepo: BusinessRepository) {}

  async transform(businessID: number): Promise<BusinessEntity> {
    try {
      return await this.businessRepo.findOneOrFail({id: businessID});
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Business does not exist');
    }
  }
}
