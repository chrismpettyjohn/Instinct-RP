import {UserEntityStruct} from '@instinct-api/database';
import {GangRankEntity} from './gang-rank.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import {RPUserEntity} from '../user/user.entity';

@Entity('rp_gangs')
export class GangEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({name: 'badge'})
  emblem!: string;

  @Column({name: 'owner_id'})
  userID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'owner_id'})
  user?: UserEntityStruct;

  @OneToMany(() => GangRankEntity, gangRank => gangRank.gang)
  ranks?: GangRankEntity[];
}
