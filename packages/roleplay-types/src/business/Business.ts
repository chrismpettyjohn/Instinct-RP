import {RPUser} from '../user';
import {exampleUser} from '@instinct-prj/interface';

export enum BusinessType {
  Store = 'store',
  GunStore = 'gun_store',
  ShootingRange = 'shooting_range',
  GarbageDisposal = 'garbage_disposal',
  PrivateDetective = 'private_detective',
  BodyGuard = 'body_guard',
  StateHospital = 'state_hospital',
  StatePolice = 'state_police',
  StateOfficial = 'state_official',
  Factory = 'factory',
  Bank = 'bank',
}

export enum GovernmentBranch {
  None = 'none',
  ExecutiveCabinet = 'executive_cabinet',
  ExecutiveOffice = 'executive_office',
  NationalAssembly = 'national_assembly',
  NationalAssemblyLeadership = 'national_assembly_leadership',
  NationalAssemblySpeaker = 'national_assembly_speaker',
}

export interface Business {
  id: number;
  owner: RPUser;
  name: string;
  type: BusinessType;
  desc: string;
  badge: string;
  homeRoomID: number;
  positions: BusinessPosition[];
}

export interface BusinessPosition {
  id: number;
  businessID: number;
  name: string;
  employees: RPUser[];
  maleUniform: string;
  femaleUniform: string;
  shiftWage: number;
  order: number;
  governmentBranch: GovernmentBranch;
}

export const exampleBusinessPosition: BusinessPosition = {
  id: 1,
  businessID: 1,
  name: 'Apprentice',
  employees: [],
  maleUniform: '-',
  femaleUniform: '-',
  shiftWage: 20,
  order: 1,
  governmentBranch: GovernmentBranch.None,
};

export const exampleBusiness: Business = {
  id: 1,
  owner: exampleUser as any,
  name: 'Armory',
  desc: 'We sell guns, bombs and freedom.',
  type: BusinessType.GunStore,
  badge: 'ADM',
  homeRoomID: 1,
  positions: [
    {
      ...exampleBusinessPosition,
      name: 'Blacksmith',
      employees: [],
    },
    exampleBusinessPosition,
  ],
};
