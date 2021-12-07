import {RPUser} from '../user/User';
import {exampleUser} from '@instinct-prj/interface';

export interface Law {
  id: number;
  title: string;
  description: string;
  content: string;
  user: RPUser;
  votes: LawVote[];
  comments: LawComment[];
  events: LawEvent[];
  status: LawStatus;
  createdAt: number;
  updatedAt: number;
  enactedAt?: number;
  presidentialStatus: LawPresidentialStatus;
  presidentialTimestamp?: number;
}

export enum LawPresidentialStatus {
  NotValid = 'not_valid',
  Pending = 'pending',
  Rejected = 'rejected',
  Approved = 'approved',
}

export enum LawStatus {
  Approved = 'approved',
  Rejected = 'rejected',
  UnderReview = 'under_review',
  Draft = 'draft',
}

export enum LawVoteStatus {
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface LawVote {
  id: number;
  lawID: number;
  user: RPUser;
  status: LawVoteStatus;
  createdAt: number;
  updatedAt: number;
}

export interface LawComment {
  id: number;
  lawID: number;
  user: RPUser;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface LawEvent {
  id: number;
  lawID: number;
  event: string;
  timestamp: number;
}

export const exampleLaw: Law = {
  id: 1,
  title: 'Test',
  description: 'Test',
  content: 'Test',
  createdAt: 0,
  updatedAt: 0,
  enactedAt: undefined,
  user: exampleUser as any,
  status: LawStatus.Approved,
  votes: [],
  comments: [],
  events: [],
  presidentialStatus: LawPresidentialStatus.NotValid,
};
