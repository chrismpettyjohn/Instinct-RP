import {examplePermissions, Permissions} from '@instinct-prj/interface';

export interface RPPermissions
  extends Omit<Permissions, 'accRoomCreator' | 'websiteAdminClient'> {
  websiteCreateBusiness: boolean;
  websiteManageBusiness: boolean;
  websiteProposeLaws: boolean;
  websiteVoteOnLaws: boolean;
  websiteDismissLaws: boolean;
  websiteOpenVotingOnLaws: boolean;
  websiteStopVotingOnLaws: boolean;
  websiteRegisterPoliticalParty: boolean;
  websiteCreateGuides: boolean;
  websiteCreateGuideCategories: boolean;
  websiteDeleteGuideCategories: boolean;
  websiteManageFood: boolean;
  websiteManageGambling: boolean;
  websiteManageWeapons: boolean;
  websiteManageVendingMachines: boolean;
  websiteManageCrimes: boolean;
  websiteManageRooms: boolean;
  websiteManageBounties: boolean;
  websiteManageProperties: boolean;
  websiteHasPresidentialPower: boolean;
}

export const exampleRPPermissions: RPPermissions = {
  ...examplePermissions,
  websiteCreateBusiness: false,
  websiteManageBusiness: false,
  websiteProposeLaws: false,
  websiteVoteOnLaws: false,
  websiteDismissLaws: false,
  websiteOpenVotingOnLaws: false,
  websiteStopVotingOnLaws: false,
  websiteRegisterPoliticalParty: false,
  websiteCreateGuides: false,
  websiteCreateGuideCategories: false,
  websiteDeleteGuideCategories: false,
  websiteManageFood: false,
  websiteManageGambling: false,
  websiteManageWeapons: false,
  websiteManageVendingMachines: false,
  websiteManageCrimes: false,
  websiteManageRooms: false,
  websiteManageBounties: false,
  websiteManageProperties: false,
  websiteHasPresidentialPower: false,
};
