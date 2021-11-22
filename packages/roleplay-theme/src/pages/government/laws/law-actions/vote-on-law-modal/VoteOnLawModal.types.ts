import {ReactNode} from 'react';
import {Law, LawVoteStatus} from '@instinct-plugin/roleplay-types';

export interface VoteOnLawModalProps {
  law: Law;
  vote: LawVoteStatus;
  onFinish(): void;
  children: ReactNode;
}
