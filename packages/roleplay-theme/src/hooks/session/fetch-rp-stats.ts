import {UserRPStats} from '@instinct-plugin/roleplay-types';
import {createFetchHook} from '@instinct-web/core';
import {rpSessionService} from '@instinct-plugin/roleplay-web';

export const useFetchRPStats = () =>
  createFetchHook<UserRPStats>(async () => {
    const user = await rpSessionService.getRPUser();
    return user.rpStats;
  });
