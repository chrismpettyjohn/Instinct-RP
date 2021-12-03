import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import {RPUserEntity} from '../../user/user.entity';
import {RPRoomEntity} from '../../room/rp-room.entity';
import {RPUserEntityStruct} from '../../user/user.types';
import {PropertyBidsEntity} from '../property-bids/property-bids.entity';
import {PropertyPhotoEntity} from '../property-photos/property-photo.entity';

@Entity('instinct_rp_properties')
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'room_id', type: 'int'})
  roomID!: number;

  @ManyToOne(() => RPRoomEntity)
  @JoinColumn({name: 'room_id'})
  room?: RPUserEntityStruct;

  @Column({name: 'user_id', type: 'int'})
  userID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'user_id'})
  user?: RPUserEntityStruct;

  @Column({name: 'customer_id', type: 'int'})
  customerID!: number;

  @ManyToOne(() => RPUserEntity)
  @JoinColumn({name: 'customer_id'})
  customer?: RPUserEntityStruct;

  @Column({name: 'listed_at', type: 'int'})
  listedAt!: string;

  @Column({name: 'sold_at', type: 'int'})
  soldAt!: string;

  @OneToMany(() => PropertyBidsEntity, propertyBids => propertyBids.property)
  bids?: PropertyBidsEntity[];

  @OneToMany(() => PropertyPhotoEntity, propertyPhoto => propertyPhoto.property)
  photos?: PropertyPhotoEntity[];
}
