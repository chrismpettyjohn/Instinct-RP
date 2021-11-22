import {RPUserEntity} from '../user/user.entity';
import {RPUserEntityStruct} from '../user/user.types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {GuideCategoryEntity} from './guide-category.entity';
import {GuideReactionEntity} from './guide-reaction.entity';

@Entity('instinct_rp_guides')
export class GuideEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'guide_categories_id'})
  categoryID!: number;

  @ManyToOne(() => GuideCategoryEntity)
  @JoinColumn({name: 'guide_categories_id'})
  category?: GuideCategoryEntity;

  @Column({name: 'user_id'})
  userID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'user_id'})
  user?: RPUserEntityStruct;

  @Column()
  name!: string;

  @Column({type: 'text'})
  content!: string;

  @Column({name: 'created_at', type: 'int'})
  createdAt!: number;

  @Column({name: 'updated_at', type: 'int'})
  updatedAt!: number;

  @OneToMany(() => GuideReactionEntity, guideReaction => guideReaction.guide)
  reactions?: GuideReactionEntity[];
}
