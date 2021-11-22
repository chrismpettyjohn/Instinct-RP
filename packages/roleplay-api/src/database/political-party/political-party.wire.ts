import {PoliticalPartyEntity} from './political-party.entity';
import {PoliticalParty, RPUser} from '@instinct-plugin/roleplay-types';

export function politicalPartyWire(
  politicalParty: PoliticalPartyEntity,
  users: RPUser[]
): PoliticalParty {
  return {
    id: politicalParty.id!,
    name: politicalParty.name,
    description: politicalParty.description,
    about: politicalParty.about,
    badge: politicalParty.badge,
    ideology: politicalParty.ideology,
    founder: users.find(_ => _.id === politicalParty.userID)!,
    members: users,
    createdAt: politicalParty.createdAt,
  };
}
