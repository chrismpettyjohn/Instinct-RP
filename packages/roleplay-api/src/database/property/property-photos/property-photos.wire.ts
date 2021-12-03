import {PropertyPhotoEntity} from './property-photo.entity';
import {PropertyPhoto} from '@instinct-plugin/roleplay-types';

export function propertyPhotoWire(entity: PropertyPhotoEntity): PropertyPhoto {
  return {
    id: entity.id!,
    photoURL: entity.photo!.imagePath,
    isPrimaryPhoto: entity.isPrimary === 1,
  };
}
