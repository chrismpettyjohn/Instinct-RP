import {LawEntity} from './law.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('instinct_rp_laws_events')
export class LawEventEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'law_id', type: 'int'})
  lawID!: number;

  @ManyToOne(() => LawEntity)
  @JoinColumn({name: 'law_id'})
  law?: LawEntity;

  @Column({type: 'text'})
  event!: string;

  @Column({type: 'int'})
  timestamp!: number;
}
