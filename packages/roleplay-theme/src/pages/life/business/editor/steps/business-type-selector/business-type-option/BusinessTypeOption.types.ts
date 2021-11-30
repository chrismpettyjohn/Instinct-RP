import {BusinessType} from '@instinct-plugin/roleplay-types';

export interface BusinessTypeOptionProps {
  businessType: BusinessType;
  selected?: boolean;
  onClick?(): void;
}
