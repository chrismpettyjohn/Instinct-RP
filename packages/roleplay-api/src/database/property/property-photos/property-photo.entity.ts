import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {PhotoEntity} from '@instinct-api/database';
import {RPRoomEntity} from '../../room/rp-room.entity';
import {RPUserEntityStruct} from '../../user/user.types';

@Entity('instinct_rp_properties_photos')
export class PropertyPhotoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'property_id', type: 'int'})
  propertyID!: number;

  @ManyToOne(() => RPRoomEntity)
  @JoinColumn({name: 'property_id'})
  property?: RPUserEntityStruct;

  @Column({name: 'photo_id', type: 'int'})
  photoID!: number;

  @ManyToOne(() => PhotoEntity)
  @JoinColumn({name: 'photo_id'})
  photo?: RPUserEntityStruct;

  @Column({name: 'is_primary', type: 'tinyint'})
  isPrimary!: 1 | 0;
}
