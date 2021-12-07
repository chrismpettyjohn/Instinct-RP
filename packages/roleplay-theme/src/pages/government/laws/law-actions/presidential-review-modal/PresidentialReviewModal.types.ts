import {Law} from '@instinct-plugin/roleplay-types';

export interface PresidentialReviewModalProps {
  law: Law;
  onFinish(): void;
}
