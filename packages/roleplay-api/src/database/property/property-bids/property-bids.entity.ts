import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {RPUserEntity} from '../../user/user.entity';
import {RPUserEntityStruct} from '../../user/user.types';
import {PropertyEntity} from '../properties/property.entity';

@Entity('instinct_rp_properties_bids')
export class PropertyBidsEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'property_id', type: 'int'})
  propertyID!: number;

  @ManyToOne(() => PropertyEntity)
  @JoinColumn({name: 'property_id'})
  property?: RPUserEntityStruct;

  @Column({name: 'user_id', type: 'int'})
  userID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'user_id'})
  user?: RPUserEntityStruct;

  @Column({type: 'int'})
  offer!: number;

  @Column({name: 'created_at', type: 'int'})
  created_at!: string;

  @Column({type: 'tinyint'})
  accepted!: 1 | 0;
}
