import {RPUser} from '../user/User';

export interface Bounty {
  id: number;
  target: RPUser;
  addedBy: RPUser;
  reward: number;
  addedAt: number;
  expiresAt: number;
}

export const exampleBounty: Bounty = {
  id: 1,
  target: {} as any,
  addedBy: {} as any,
  reward: 100,
  addedAt: 0,
  expiresAt: 0,
};
