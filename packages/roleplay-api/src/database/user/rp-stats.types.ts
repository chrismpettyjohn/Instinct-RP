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
