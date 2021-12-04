import {Property} from '@instinct-plugin/roleplay-types';

export interface EditPropertyModalProps {
  property: Property;
  onChange(): void;
}
