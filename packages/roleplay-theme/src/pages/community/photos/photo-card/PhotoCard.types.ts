import {Photo} from '@instinct-prj/interface';

export interface PhotoCardProps {
  photo: Photo;
  onChange(): void;
}
