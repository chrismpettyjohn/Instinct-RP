import {Crime} from '@instinct-plugin/roleplay-types';
import {CrimeEntity, CrimeStackable, CrimeTicketable} from './crime.entity';

export function crimeWire(entity: CrimeEntity): Crime {
  return {
    id: entity.id!,
    name: entity.name,
    aliases: entity.aliases,
    jailTimeInMinutes: entity.jailTimeInMinutes,
    ticketable: entity.ticketable === CrimeTicketable.Yes,
    ticketCost: entity.ticketCost,
    stackable: entity.stackable === CrimeStackable.Yes,
  };
}
