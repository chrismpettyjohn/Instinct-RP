import {RPUser} from '../user';

export enum PoliticalIdeology {
  Leftist = 'left',
  Rightist = 'right',
  Center = 'center',
  Other = 'other',
}

export interface PoliticalParty {
  id: number;
  name: string;
  description: string;
  about: string;
  badge: string;
  ideology: PoliticalIdeology;
  founder: RPUser;
  members: RPUser[];
  createdAt: number;
}

export const examplePoliticalParty: PoliticalParty = {
  id: 1,
  name: '',
  description: '',
  about: '',
  badge: '',
  founder: {} as any,
  members: [],
  ideology: PoliticalIdeology.Center,
  createdAt: 0,
};
