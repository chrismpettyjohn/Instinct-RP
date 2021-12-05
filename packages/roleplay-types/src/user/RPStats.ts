import {BusinessPosition} from '../business/Business';

export interface BusinessPositionWithBusiness extends BusinessPosition {
  businessName: string;
}

export interface UserJob {
  businessID: number;
  positionID: number;
  businessName: string;
  positionName: string;
  businessBadge: string;
}

export const exampleUserJob: UserJob = {
  businessID: 1,
  positionID: 1,
  businessName: 'Beta Testers',
  positionName: 'Test',
  businessBadge: 'BETA',
};

export interface UserGang {
  gangID: number;
  rankID: number;
  gangName: string;
  rankName: string;
  gangBadge: string;
}

export interface UserPoliticalParty {
  id: number;
  name: string;
  description: string;
  badge: string;
}

export interface UserRPStats {
  health: {
    current: number;
    maximum: number;
  };
  energy: {
    current: number;
    maximum: number;
  };
  kills: {
    total: number;
    meleeKills: number;
    gunKills: number;
    bombKills: number;
  };
  deaths: {
    total: number;
    meleeDeaths: number;
    gunDeaths: number;
    bombDeaths: number;
  };
  police: {
    timesArrested: number;
    arrestsMade: number;
    timesEvaded: number;
  };
  damage: {
    damageTaken: number;
    damageGiven: number;
  };
  job?: UserJob;
  gang?: UserGang;
  politicalParty?: UserPoliticalParty;
}

export const exampleUserRPStats: UserRPStats = {
  health: {
    current: 100,
    maximum: 100,
  },
  energy: {
    current: 100,
    maximum: 100,
  },
  kills: {
    total: 0,
    meleeKills: 0,
    gunKills: 0,
    bombKills: 0,
  },
  deaths: {
    total: 0,
    meleeDeaths: 0,
    gunDeaths: 0,
    bombDeaths: 0,
  },
  police: {
    timesArrested: 0,
    arrestsMade: 0,
    timesEvaded: 0,
  },
  damage: {
    damageTaken: 0,
    damageGiven: 0,
  },
  job: exampleUserJob,
};
