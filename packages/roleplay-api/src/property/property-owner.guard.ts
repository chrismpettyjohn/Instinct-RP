import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {PropertyRepository} from '../database/property/properties/property.repository';

@Injectable()
export class PropertyOwnerGuard implements CanActivate {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userID = request.user?.id;
    const propertyID = request.params?.propertyID;

    const property = await this.propertyRepo.findOne({id: propertyID});

    console.log(request);

    return property?.userID === userID;
  }
}
