import {createFetchHook} from '@instinct-web/core';
import {GangHighScores} from '@instinct-plugin/roleplay-types';
import {highScoreService} from '@instinct-plugin/roleplay-web';

export const useFetchTopGangs = () =>
  createFetchHook<GangHighScores>(highScoreService.getTopGangs);
