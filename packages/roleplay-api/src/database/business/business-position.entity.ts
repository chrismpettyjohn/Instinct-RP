import {BusinessEntity} from './business.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {GovernmentBranch} from '@instinct-plugin/roleplay-types';

@Entity('rp_jobs_ranks')
export class BusinessPositionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'job', type: 'int'})
  jobID!: number;

  @Column({name: 'rank', type: 'int'})
  jobRankID!: number;

  @Column({type: 'varchar', length: 100})
  name!: string;

  @Column({name: 'government_branch'})
  governmentBranch!: GovernmentBranch;

  @Column({name: 'male_figure', type: 'varchar', length: 100})
  maleUniform!: string;

  @Column({name: 'female_figure', type: 'varchar', length: 100})
  femaleUniform!: string;

  @Column({name: 'pay', type: 'int'})
  shiftWage!: number;

  @ManyToOne(() => BusinessEntity, business => business.positions)
  @JoinColumn({name: 'job'})
  business?: BusinessEntity;
}
