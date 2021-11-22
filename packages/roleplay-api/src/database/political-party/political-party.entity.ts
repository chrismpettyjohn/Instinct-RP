import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {RPUserEntity} from '../user/user.entity';
import {RPUserEntityStruct} from '../user/user.types';
import {PoliticalIdeology} from '@instinct-plugin/roleplay-types';
import {PoliticalPartyMemberEntity} from './political-party-member.entity';

@Entity('instinct_rp_political_parties')
export class PoliticalPartyEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'user_id', type: 'int'})
  userID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'user_id'})
  user?: RPUserEntityStruct;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({type: 'text'})
  about!: string;

  @Column()
  badge!: string;

  @Column({type: 'enum'})
  ideology!: PoliticalIdeology;

  @Column({name: 'created_at', type: 'int'})
  createdAt!: number;

  @Column({name: 'updated_at', type: 'int'})
  updatedAt!: number;

  @OneToMany(
    () => PoliticalPartyMemberEntity,
    politicalPartyMember => politicalPartyMember.politicalParty
  )
  members?: PoliticalPartyMemberEntity[];
}
