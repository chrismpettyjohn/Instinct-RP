import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';
import {PropertyEntity} from '../database/property/properties/property.entity';
import {PropertyRepository} from '../database/property/properties/property.repository';

@Injectable()
export class PropertyPipe implements PipeTransform {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async transform(propertyID: number): Promise<PropertyEntity> {
    try {
      return await this.propertyRepo.findOneOrFail({id: propertyID});
    } catch (e) {
      throw new NotFoundException('Property does not exist');
    }
  }
}
