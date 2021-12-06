import {RPUser} from './User';
import {exampleUser} from '@instinct-prj/interface';

export interface UserHighScores {
  mostKills: RPUser[];
  mostDeaths: RPUser[];
  mostDamageGiven: RPUser[];
  mostDamageReceived: RPUser[];
  mostArrests: RPUser[];
  mostJailTime: RPUser[];
  timestamp: number;
}

export const exampleUserHighScores: UserHighScores = {
  mostKills: [exampleUser] as any,
  mostDeaths: [exampleUser] as any,
  mostDamageGiven: [exampleUser] as any,
  mostDamageReceived: [exampleUser] as any,
  mostArrests: [exampleUser] as any,
  mostJailTime: [exampleUser] as any,
  timestamp: 0,
};
