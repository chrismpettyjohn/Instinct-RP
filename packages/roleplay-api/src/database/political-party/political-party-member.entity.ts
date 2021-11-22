import {UserRPStatEntity} from '../user/rp-stats.entity';
import {PoliticalPartyEntity} from './political-party.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
@Entity('instinct_rp_political_parties_members')
export class PoliticalPartyMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'political_party_id', type: 'int'})
  politicalPartyID!: number;

  @ManyToOne(
    () => PoliticalPartyEntity,
    politicalParty => politicalParty.members,
    {eager: true}
  )
  @JoinColumn({name: 'political_party_id'})
  politicalParty?: PoliticalPartyEntity;

  @Column({name: 'user_id', type: 'int'})
  userID!: number;

  @OneToOne(() => UserRPStatEntity, userRPStat => userRPStat.politicalParty)
  @JoinColumn({name: 'user_id'})
  user?: UserRPStatEntity;

  @Column({name: 'is_admin', type: 'boolean'})
  isAdmin!: boolean;
}
