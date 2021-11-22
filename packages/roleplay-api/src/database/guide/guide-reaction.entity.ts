import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {GuideEntity} from './guide.entity';
import {RPUserEntity} from '../user/user.entity';
import {RPUserEntityStruct} from '../user/user.types';
import {GuideReaction} from '@instinct-plugin/roleplay-types';

@Entity('instinct_rp_guide_reactions')
export class GuideReactionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'guide_id'})
  guideID!: number;

  @ManyToOne(() => GuideEntity)
  @JoinColumn({name: 'guide_id'})
  guide?: GuideEntity;

  @Column({name: 'user_id'})
  userID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'user_id'})
  user?: RPUserEntityStruct;

  @Column({type: 'enum'})
  reaction!: GuideReaction;
}
