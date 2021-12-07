import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum CrimeTicketable {
  Yes = '1',
  No = '0',
}

export enum CrimeStackable {
  Yes = '1',
  No = '0',
}

@Entity('rp_crimes')
export class CrimeEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'crime'})
  name!: string;

  @Column()
  description!: string;

  @Column()
  aliases!: string;

  @Column({name: 'jail_time', type: 'int'})
  jailTimeInMinutes!: number;

  @Column({type: 'enum'})
  ticketable!: CrimeTicketable;

  @Column({name: 'ticket_cost'})
  ticketCost!: number;

  @Column({type: 'enum'})
  stackable!: CrimeStackable;
}
