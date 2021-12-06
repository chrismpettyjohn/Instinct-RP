import {RPPermissions, exampleRPPermissions} from './Permissions';
import {exampleRank, Rank} from '@instinct-prj/interface';
import {RPUser} from '../user';

export interface RPRank extends Omit<Rank, 'permissions' | 'users'> {
  desc: string;
  users: RPUser[];
  permissions: RPPermissions;
}

export const exampleRPRank: RPRank = {
  ...exampleRank,
  desc: '',
  users: [],
  permissions: exampleRPPermissions,
};
