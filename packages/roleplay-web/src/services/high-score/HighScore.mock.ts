import {HighScoreService} from './HighScore.types';

export class HighScoreServiceMock implements HighScoreService {
  async getTopUsers() {
    return {} as any;
  }

  async getTopGangs() {
    return {} as any;
  }
}
