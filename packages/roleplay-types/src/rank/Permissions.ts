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
  websiteManageRP: boolean;
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
  websiteManageRP: false,
};
