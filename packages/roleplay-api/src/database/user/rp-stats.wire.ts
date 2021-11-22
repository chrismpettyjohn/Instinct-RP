import {UserRPStatEntity} from './rp-stats.entity';
import {GangEntity, GangRankEntity} from '../gang';
import {BusinessEntity} from '../business/business.entity';
import {UserRPStats} from '@instinct-plugin/roleplay-types';
import {BusinessPositionEntity} from '../business/business-position.entity';
import {BusinessData, EnergyData, GangData, HealthData} from './rp-stats.types';

export function parseHealthData(data?: string): HealthData {
  const splitData = data?.split(';');
  return {
    current: Number(splitData?.[0] ?? 0),
    maximum: Number(splitData?.[1] ?? 0),
  };
}

export function parseEnergyData(data?: string): EnergyData {
  const splitData = data?.split(';');
  return {
    current: Number(splitData?.[0] ?? 0),
    maximum: Number(splitData?.[1] ?? 0),
  };
}

export function parseBusinessData(data?: string): BusinessData {
  const splitData = data?.split(';');
  return {
    jobID: Number(splitData?.[0] ?? 0),
    jobRankID: Number(splitData?.[1] ?? 0),
    experience: Number(splitData?.[2] ?? 0),
    canSendHome: Number(splitData?.[3]) === 1,
  };
}

export function parseGangData(data?: string): GangData {
  const splitData = data?.split(';');
  return {
    gangID: Number(splitData?.[0] ?? 0),
    gangRankID: Number(splitData?.[1] ?? 0),
    experience: Number(splitData?.[2] ?? 0),
  };
}
export function rpStatsWire(
  entity: UserRPStatEntity,
  gang?: GangEntity,
  gangPosition?: GangRankEntity,
  job?: BusinessEntity,
  jobPosition?: BusinessPositionEntity
): UserRPStats {
  return {
    health: parseHealthData(entity.healthData),
    energy: parseEnergyData(entity.energyData),
    job: job &&
      jobPosition && {
        businessID: job.id!,
        positionID: jobPosition.id!,
        businessName: job.name,
        positionName: jobPosition.name,
        businessBadge: job.badge,
      },
    gang: gang &&
      gangPosition && {
        gangID: gang.id!,
        rankID: gangPosition.id!,
        gangName: gang.name,
        rankName: gangPosition.name,
        gangBadge: gang.emblem,
      },
    politicalParty: entity.politicalParty?.politicalParty && {
      id: entity.politicalParty.politicalParty.id!,
      name: entity.politicalParty.politicalParty.name,
      description: entity.politicalParty.politicalParty.description,
      badge: entity.politicalParty.politicalParty.badge,
    },
  };
}
