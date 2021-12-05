export interface HealthData {
  current: number;
  maximum: number;
}

export interface EnergyData {
  current: number;
  maximum: number;
}

export interface BusinessData {
  jobID: number;
  jobRankID: number;
  experience: number;
  canSendHome: boolean;
}

export interface GangData {
  gangID: number;
  gangRankID: number;
  experience: number;
}

export interface KillsData {
  total: number;
  meleeKills: number;
  gunKills: number;
  bombKills: number;
}

export interface DeathsData {
  total: number;
  meleeDeaths: number;
  gunDeaths: number;
  bombDeaths: number;
}

export interface PoliceData {
  timesArrested: number;
  arrestsMade: number;
  timesEvaded: number;
}

export interface DamageData {
  damageTaken: number;
  damageGiven: number;
}
