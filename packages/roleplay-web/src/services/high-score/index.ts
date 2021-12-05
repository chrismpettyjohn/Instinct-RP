import {HighScoreService} from './HighScore.types';
import {HighScoreServiceMock} from './HighScore.mock';
import {HighScoreServiceImplementation} from './HighScore.service';

export const highScoreService: HighScoreService =
  process.env.NODE_ENV !== 'test'
    ? new HighScoreServiceImplementation()
    : new HighScoreServiceMock();
