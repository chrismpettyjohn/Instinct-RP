import {RPRankEntityStruct} from './rank.types';
import {RPRank, RPUser} from '@instinct-plugin/roleplay-types';
import {PermissionStatus, rankWire} from '@instinct-api/database';

export function rpRankWire(
  entity: RPRankEntityStruct,
  users?: RPUser[]
): RPRank {
  const baseWire = rankWire(entity as any);
  return {
    ...baseWire,
    desc: entity.description,
    users: users ?? [],
    permissions: {
      ...baseWire.permissions,
      websiteCreateBusiness:
        entity.websiteCreateBusiness === PermissionStatus.Enabled,
      websiteManageBusiness:
        entity.websiteManageBusiness === PermissionStatus.Enabled,
      websiteProposeLaws:
        entity.websiteProposeLaws === PermissionStatus.Enabled,
      websiteVoteOnLaws: entity.websiteVoteOnLaws === PermissionStatus.Enabled,
      websiteDismissLaws:
        entity.websiteDismissLaws === PermissionStatus.Enabled,
      websiteOpenVotingOnLaws:
        entity.websiteOpenVotingOnLaws === PermissionStatus.Enabled,
      websiteStopVotingOnLaws:
        entity.websiteStopVotingOnLaws === PermissionStatus.Enabled,
      websiteRegisterPoliticalParty:
        entity.websiteRegisterPoliticalParty === PermissionStatus.Enabled,
      websiteCreateGuides:
        entity.websiteCreateGuides === PermissionStatus.Enabled,
      websiteCreateGuideCategories:
        entity.websiteCreateGuideCategories === PermissionStatus.Enabled,
      websiteDeleteGuideCategories:
        entity.websiteDeleteGuideCategories === PermissionStatus.Enabled,
      websiteManageFood: entity.websiteManageFood === PermissionStatus.Enabled,
      websiteManageVendingMachines:
        entity.websiteManageVendingMachines === PermissionStatus.Enabled,
      websiteManageGambling:
        entity.websiteManageGambling === PermissionStatus.Enabled,
      websiteManageWeapons:
        entity.websiteManageWeapons === PermissionStatus.Enabled,
      websiteManageCrimes:
        entity.websiteManageCrimes === PermissionStatus.Enabled,
      websiteManageRooms:
        entity.websiteManageRooms === PermissionStatus.Enabled,
      websiteManageBounties:
        entity.websiteManageBounties === PermissionStatus.Enabled,
      websiteManageProperties:
        entity.websiteManageProperties === PermissionStatus.Enabled,
      websiteHasPresidentialPower:
        entity.websiteHasPresidentialPower === PermissionStatus.Enabled,
    },
  };
}
