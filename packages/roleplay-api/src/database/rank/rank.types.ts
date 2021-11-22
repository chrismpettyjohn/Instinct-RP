import {RPUserEntityStruct} from '../user/user.types';
import {GovernmentBranch, RPPermissions} from '@instinct-plugin/roleplay-types';
import {PermissionStatus, RankEntityStruct} from '@instinct-api/database';

export type RPPermissionsStruct = Record<keyof RPPermissions, PermissionStatus>;

export interface RPRankEntityStruct
  extends RPPermissionsStruct,
    Omit<RankEntityStruct, 'users'> {
  users: RPUserEntityStruct[];
  websiteCreateBusiness: PermissionStatus;
  websiteManageBusiness: PermissionStatus;
  websiteGovernmentBranch: GovernmentBranch;
  websiteProposeLaws: PermissionStatus;
  websiteVoteOnLaws: PermissionStatus;
}
