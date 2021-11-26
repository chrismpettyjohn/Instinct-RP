import {userService} from '@instinct-plugin/roleplay-web';
import {UserRPStats} from '@instinct-plugin/roleplay-types';
import {createFetchHook} from '@instinct-web/core';

export const useFetchRPStatsByUsername = (username: string) =>
  createFetchHook<UserRPStats>(
    () => userService.getRPStats(username),
    username
  );
