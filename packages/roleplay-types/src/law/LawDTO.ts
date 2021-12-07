import {LawPresidentialStatus, LawVoteStatus} from './Law';

export interface LawDTO {
  title: string;
  description: string;
  content: string;
}

export interface LawVoteDTO {
  status: LawVoteStatus;
}

export interface LawPresidentialDecisionDTO {
  decision: 'approved' | 'rejected';
}
