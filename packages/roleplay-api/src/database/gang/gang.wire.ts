import {GangEntity} from './gang.entity';
import {Gang, RPUser} from '@instinct-plugin/roleplay-types';

export function gangWire(entity: GangEntity, members: RPUser[]): Gang {
  console.log(members);
  return {
    id: entity.id!,
    name: entity.name,
    badge: entity.emblem,
    owner: members.find(_ => _.id! === entity.userID)!,
    ranks: entity.ranks!.map(gangRank => ({
      id: gangRank.gangRankID!,
      gangID: gangRank.gangID,
      name: gangRank.name,
      users: members.filter(
        gangMember => gangMember.rpStats.gang?.rankID === gangRank.id!
      ),
    })),
  };
}
