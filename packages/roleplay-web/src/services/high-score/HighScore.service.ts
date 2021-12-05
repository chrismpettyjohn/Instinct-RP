import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {HighScoreService} from './HighScore.types';
import {UserHighScores} from '@instinct-plugin/roleplay-types';

export class HighScoreServiceImplementation implements HighScoreService {
  async getTopUsers() {
    const topUserScores: AxiosResponse<UserHighScores> = await backendAPI.get(
      '/high-scores/users'
    );
    return topUserScores.data;
  }
}
