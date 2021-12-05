import {createFetchHook} from '@instinct-web/core';
import {UserHighScores} from '@instinct-plugin/roleplay-types';
import {highScoreService} from '@instinct-plugin/roleplay-web';

export const useFetchTopUsers = () =>
  createFetchHook<UserHighScores>(highScoreService.getTopUsers);
