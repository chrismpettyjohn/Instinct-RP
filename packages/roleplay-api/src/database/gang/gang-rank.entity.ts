import {GangEntity} from './gang.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rp_gangs_ranks')
export class GangRankEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'gang', type: 'integer'})
  gangID!: number;

  @Column({name: 'rank', type: 'integer'})
  gangRankID!: number;

  @ManyToOne(() => GangEntity)
  @JoinColumn({name: 'gang'})
  gang?: GangEntity;

  @Column()
  name!: string;
}
