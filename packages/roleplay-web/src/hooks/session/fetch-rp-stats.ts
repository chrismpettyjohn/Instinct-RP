import {UserRPStats} from '@instinct-plugin/roleplay-types';
import {createFetchHook} from '@instinct-web/core';
import {rpSessionService} from '../../services/session';

export const useFetchRPStats = () =>
  createFetchHook<UserRPStats>(async () => {
    const user = await rpSessionService.getRPUser();
    return user.rpStats;
  });
