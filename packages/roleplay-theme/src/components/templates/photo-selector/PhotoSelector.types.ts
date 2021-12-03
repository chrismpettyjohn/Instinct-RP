import {Photo} from '@instinct-prj/interface';

export interface PhotoSelectorProps {
  photoID?: number;
  onChange(newPhoto: Photo): void;
}
