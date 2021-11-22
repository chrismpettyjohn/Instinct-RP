import {UserEntityStruct} from '@instinct-api/database';
import {BusinessPositionEntity} from './business-position.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import {BusinessType, GovernmentBranch} from '@instinct-plugin/roleplay-types';
import {RPUserEntity} from '../user/user.entity';
import {IsGovernment} from './business.types';

@Entity('rp_jobs')
export class BusinessEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({type: 'varchar', length: 100})
  name!: string;

  @Column({type: 'text'})
  desc!: string;

  @Column({name: 'worktype', type: 'varchar'})
  type!: BusinessType;

  @Column({type: 'varchar', length: 25})
  badge!: string;

  @Column({name: 'created', type: 'double'})
  createdAt!: number;

  @Column({name: 'room_id', type: 'int'})
  workRoom!: number;

  @Column({name: 'owner_id', type: 'int'})
  userID!: number;

  @Column({name: 'is_government', type: 'enum'})
  isGovernment!: IsGovernment;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'owner_id'})
  user?: UserEntityStruct;

  @OneToMany(
    () => BusinessPositionEntity,
    businessPosition => businessPosition.business
  )
  positions?: BusinessPositionEntity[];
}
