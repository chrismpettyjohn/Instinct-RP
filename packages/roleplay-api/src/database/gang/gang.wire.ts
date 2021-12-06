import {GangEntity} from './gang.entity';
import {Gang, RPUser} from '@instinct-plugin/roleplay-types';
import {GangStatsData} from './gang.types';

export function parseGangStats(stats?: string): GangStatsData {
  const splitData = stats?.split(';');
  return {
    kills: Number(splitData?.[0] ?? 0),
    deaths: Number(splitData?.[1] ?? 0),
    score: Number(splitData?.[2] ?? 0),
    turfs: Number(splitData?.[3] ?? 0),
    heists: Number(splitData?.[4] ?? 0),
  };
}

export function gangWire(entity: GangEntity, members: RPUser[]): Gang {
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
    stats: parseGangStats(entity.stats),
  };
}
