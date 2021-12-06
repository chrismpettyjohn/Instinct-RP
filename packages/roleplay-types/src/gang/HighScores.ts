import {Gang} from './Gang';

export interface GangHighScores {
  mostKills: Gang[];
  mostDeaths: Gang[];
  highestScore: Gang[];
  mostTurfs: Gang[];
  mostHeists: Gang[];
  timestamp: number;
}

export const exampleGangHighScores: GangHighScores = {
  mostKills: [],
  mostDeaths: [],
  highestScore: [],
  mostTurfs: [],
  mostHeists: [],
  timestamp: 0,
};
