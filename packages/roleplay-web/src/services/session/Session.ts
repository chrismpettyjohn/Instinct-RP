import {AxiosResponse} from 'axios';
import {backendAPI} from '@instinct-web/core';
import {RPSessionService} from './Session.types';
import {RPUser} from '@instinct-plugin/roleplay-types';

class RPSessionServiceImplementation implements RPSessionService {
  async getRPUser() {
    const user: AxiosResponse<RPUser> = await backendAPI.get('session/rp');
    return user.data;
  }
}

export const rpSessionService: RPSessionService =
  new RPSessionServiceImplementation();
