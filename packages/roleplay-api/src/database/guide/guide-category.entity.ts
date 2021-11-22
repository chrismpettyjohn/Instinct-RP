import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {GuideEntity} from './guide.entity';

@Entity('instinct_rp_guide_categories')
export class GuideCategoryEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  color!: string;

  @OneToMany(() => GuideEntity, guide => guide.category)
  guides?: GuideEntity[];
}
