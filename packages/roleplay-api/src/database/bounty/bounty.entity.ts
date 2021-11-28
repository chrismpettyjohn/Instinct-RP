import {RPUserEntity} from '../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('rp_bounties')
export class BountyEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'user_id', type: 'int'})
  targetUserID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'user_id'})
  targetUser?: RPUserEntity;

  @Column({name: 'added_by', type: 'int'})
  addedByUserID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'added_by'})
  addedByUser?: RPUserEntity;

  @Column({type: 'int'})
  reward!: number;

  @Column({name: 'timestamp', type: 'int'})
  addedAt!: number;

  @Column({name: 'timestamp_expire', type: 'int'})
  expiresAt!: number;
}
