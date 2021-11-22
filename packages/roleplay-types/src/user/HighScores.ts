import {exampleUser, User} from '@instinct-prj/interface';

export interface UserHighScores {
  kills: User[];
  deaths: User[];
  arrests: User[];
  jailTime: User[];
}

export const exampleUserHighScores: UserHighScores = {
  kills: [exampleUser],
  deaths: [exampleUser],
  arrests: [exampleUser],
  jailTime: [exampleUser],
};
