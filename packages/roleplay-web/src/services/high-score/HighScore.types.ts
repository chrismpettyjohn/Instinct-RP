import {GangHighScores, UserHighScores} from '@instinct-plugin/roleplay-types';

export interface HighScoreService {
  getTopUsers(): Promise<UserHighScores>;
  getTopGangs(): Promise<GangHighScores>;
}
