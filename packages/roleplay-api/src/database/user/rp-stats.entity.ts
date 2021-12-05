import {UserEntity} from '@instinct-api/database';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import {RPUserEntityStruct} from './user.types';
import {PoliticalPartyMemberEntity} from '../political-party/political-party-member.entity';

@Entity('rp_stats')
export class UserRPStatEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id!: number;

  @Column({name: 'health'})
  healthData!: string;

  @Column({name: 'hunger'})
  hungerData!: string;

  @Column({name: 'armor'})
  armorData!: string;

  @Column({name: 'energy'})
  energyData!: string;

  @Column({name: 'jailed'})
  jailedData!: string;

  @Column({name: 'cuffed'})
  cuffedData!: string;

  @Column({name: 'wanted'})
  wantedData!: string;

  @Column({name: 'kills'})
  killsData!: string;

  @Column({name: 'dead'})
  deathsData!: string;

  @Column({name: 'job'})
  jobData!: string;

  @Column({name: 'gang'})
  gangData!: string;

  @Column({name: 'police_stats'})
  policeData!: string;

  @Column({name: 'damages'})
  damageData!: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({name: 'id'})
  user?: RPUserEntityStruct;

  @ManyToOne(
    () => PoliticalPartyMemberEntity,
    politicalPartyMember => politicalPartyMember.user
  )
  @JoinColumn({name: 'id'})
  politicalParty?: PoliticalPartyMemberEntity;
}
