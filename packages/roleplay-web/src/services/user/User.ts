import {AxiosResponse} from 'axios';
import {UserService} from './User.types';
import {backendAPI} from '@instinct-web/core';
import {UserRPStats} from '@instinct-plugin/roleplay-types';

export class UserServiceImplementation implements UserService {
  async getRPStats(username: string) {
    const rpStats: AxiosResponse<UserRPStats> = await backendAPI.get(
      `users/profile/${username}/rp`
    );
    return rpStats.data;
  }
}
