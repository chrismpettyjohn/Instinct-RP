import {Children} from '@instinct-web/core';

export interface WizardStep {
  text: Children;
  children: Children;
}

export interface WizardCardProps {
  steps: WizardStep[];
  header?: Children;
  onSubmit(): void;
}
