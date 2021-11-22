import {LawVoteEntity} from './law-vote.entity';
import {LawCommentEntity} from './law-comment.entity';
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
import {LawStatus} from '@instinct-plugin/roleplay-types';
import {LawEventEntity} from './law-event.entity';

@Entity('instinct_rp_laws')
export class LawEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'user_id', type: 'int'})
  userID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'user_id'})
  user?: RPUserEntityStruct;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({type: 'text'})
  content!: string;

  @Column({type: 'enum'})
  status!: LawStatus;

  @Column({name: 'created_at', type: 'int'})
  createdAt!: number;

  @Column({name: 'updated_at', type: 'int'})
  updatedAt!: number;

  @Column({name: 'enacted_at', type: 'int'})
  enactedAt?: number;

  @OneToMany(() => LawVoteEntity, lawVote => lawVote.law)
  votes?: LawVoteEntity[];

  @OneToMany(() => LawCommentEntity, lawComment => lawComment.law)
  comments?: LawCommentEntity[];

  @OneToMany(() => LawEventEntity, lawComment => lawComment.law)
  events?: LawEventEntity[];
}
