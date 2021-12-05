import {UserRPStatEntity} from './rp-stats.entity';
import {GangEntity, GangRankEntity} from '../gang';
import {BusinessEntity} from '../business/business.entity';
import {UserRPStats} from '@instinct-plugin/roleplay-types';
import {BusinessPositionEntity} from '../business/business-position.entity';
import {
  BusinessData,
  DamageData,
  DeathsData,
  EnergyData,
  GangData,
  HealthData,
  KillsData,
  PoliceData,
} from './rp-stats.types';

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

export function parseKillsData(data?: string): KillsData {
  const splitData = data?.split(';');
  const [meleeKills, gunKills, bombKills] = [
    Number(splitData?.[0] ?? 0),
    Number(splitData?.[1] ?? 0),
    Number(splitData?.[2] ?? 0),
  ];
  return {
    total: Number(meleeKills + gunKills + bombKills),
    meleeKills,
    gunKills,
    bombKills,
  };
}

export function parseDeathsData(data?: string): DeathsData {
  const splitData = data?.split(';');
  const [meleeDeaths, gunDeaths, bombDeaths] = [
    Number(splitData?.[0] ?? 0),
    Number(splitData?.[1] ?? 0),
    Number(splitData?.[2] ?? 0),
  ];
  return {
    total: Number(meleeDeaths + gunDeaths + bombDeaths),
    meleeDeaths,
    gunDeaths,
    bombDeaths,
  };
}

export function parsePoliceData(data?: string): PoliceData {
  const splitData = data?.split(';');
  return {
    timesArrested: Number(splitData?.[0] ?? 0),
    arrestsMade: Number(splitData?.[1] ?? 0),
    timesEvaded: Number(splitData?.[2] ?? 0),
  };
}

export function parseDamageData(data?: string): DamageData {
  const splitData = data?.split(';');
  return {
    damageGiven: Number(splitData?.[0] ?? 0),
    damageTaken: Number(splitData?.[1] ?? 0),
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
    kills: parseKillsData(entity.killsData),
    deaths: parseDeathsData(entity.deathsData),
    police: parsePoliceData(entity.policeData),
    damage: parseDamageData(entity.damageData),
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
