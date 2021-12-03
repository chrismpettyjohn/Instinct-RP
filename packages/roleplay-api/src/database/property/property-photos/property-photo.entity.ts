import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {PropertyEntity} from '../properties/property.entity';
import {PhotoEntity, PhotoEntityStruct} from '@instinct-api/database';

@Entity('instinct_rp_properties_photos')
export class PropertyPhotoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'property_id', type: 'int'})
  propertyID!: number;

  @ManyToOne(() => PropertyEntity)
  @JoinColumn({name: 'property_id'})
  property?: PropertyEntity;

  @Column({name: 'photo_id', type: 'int'})
  photoID!: number;

  @ManyToOne(() => PhotoEntity)
  @JoinColumn({name: 'photo_id'})
  photo?: PhotoEntityStruct;

  @Column({name: 'is_primary', type: 'tinyint'})
  isPrimary!: 1 | 0;
}
