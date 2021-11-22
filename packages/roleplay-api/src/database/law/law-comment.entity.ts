import {LawEntity} from './law.entity';
import {RPUserEntity} from '../user/user.entity';
import {RPUserEntityStruct} from '../user/user.types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('instinct_rp_laws_comments')
export class LawCommentEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'user_id', type: 'int'})
  userID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'user_id'})
  user?: RPUserEntityStruct;

  @Column({name: 'law_id', type: 'int'})
  lawID!: number;

  @ManyToOne(() => LawEntity)
  @JoinColumn({name: 'law_id'})
  law?: LawEntity;

  @Column({type: 'text'})
  content!: string;

  @Column({name: 'created_at', type: 'int'})
  createdAt!: number;

  @Column({name: 'updated_at', type: 'int'})
  updatedAt!: number;
}
