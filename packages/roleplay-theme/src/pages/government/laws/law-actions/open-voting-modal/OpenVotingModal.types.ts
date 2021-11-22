import {Law} from '@instinct-plugin/roleplay-types';

export interface OpenVotingModalProps {
  law: Law;
  onFinish(): void;
}
