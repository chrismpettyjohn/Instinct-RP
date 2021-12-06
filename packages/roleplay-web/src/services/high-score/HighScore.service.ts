import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {HighScoreService} from './HighScore.types';
import {GangHighScores, UserHighScores} from '@instinct-plugin/roleplay-types';

export class HighScoreServiceImplementation implements HighScoreService {
  async getTopUsers() {
    const topUserScores: AxiosResponse<UserHighScores> = await backendAPI.get(
      '/high-scores/users'
    );
    return topUserScores.data;
  }

  async getTopGangs() {
    const topGangScores: AxiosResponse<GangHighScores> = await backendAPI.get(
      '/high-scores/gangs'
    );
    return topGangScores.data;
  }
}
