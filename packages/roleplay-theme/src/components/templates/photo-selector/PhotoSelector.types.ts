import {Photo} from '@instinct-prj/interface';

export interface PhotoSelectorProps {
  photos: Photo[];
  photoID?: number;
  onChange(newPhoto: Photo): void;
}
