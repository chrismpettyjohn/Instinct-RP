import {PipeTransform, Injectable} from '@nestjs/common';
import {RPUserRepository} from '../database/user/user.repository';
import {PropertyEntity} from '../database/property/properties/property.entity';
import {PropertyRepository} from '../database/property/properties/property.repository';

@Injectable()
export class PropertyByUsernamePipe implements PipeTransform {
  constructor(
    private readonly userRepo: RPUserRepository,
    private readonly propertyRepo: PropertyRepository
  ) {}

  async transform(username: string): Promise<PropertyEntity[]> {
    const user = await this.userRepo.findOneOrFail({username});
    return await this.propertyRepo.find({userID: user.id!});
  }
}
