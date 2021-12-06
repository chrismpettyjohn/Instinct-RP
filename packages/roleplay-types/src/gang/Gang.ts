import {RPUser} from '../user';
import {exampleUser} from '@instinct-prj/interface';

export interface Gang {
  id: number;
  name: string;
  badge: string;
  owner: RPUser;
  ranks: GangRank[];
  stats: {
    kills: number;
    deaths: number;
    score: number;
    turfs: number;
    heists: number;
  };
}

export interface GangRank {
  id: number;
  gangID: number;
  name: string;
  users: RPUser[];
}

export const exampleGangRank: GangRank = {
  id: 1,
  gangID: 1,
  name: '',
  users: [],
};

export const exampleGang: Gang = {
  id: 1,
  name: '',
  badge: '',
  owner: exampleUser as any,
  ranks: [exampleGangRank],
  stats: {
    kills: 0,
    deaths: 0,
    score: 0,
    turfs: 0,
    heists: 0,
  },
};
