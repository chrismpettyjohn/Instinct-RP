import {RPUser} from '../user';
import {exampleUser, User} from '@instinct-prj/interface';

export enum GuideReaction {
  Like = 'like',
  Dislike = 'dislike',
}

export interface GuideCategory {
  id: number;
  name: string;
  color: string;
}

export interface GuideUserReaction {
  user: User;
  reaction: GuideReaction;
}

export interface Guide {
  id: number;
  user: RPUser;
  name: string;
  content: string;
  reactions: GuideUserReaction[];
  category: GuideCategory;
  createdAt: number;
  updatedAt: number;
}

export const exampleGuide: Guide = {
  id: 1,
  user: exampleUser as any,
  name: '',
  content: '',
  reactions: [],
  category: {
    id: 1,
    name: '',
    color: '',
  },
  createdAt: 0,
  updatedAt: 0,
};
