import {RoomEntity, RoomEntityStruct} from '@instinct-api/database';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

export enum RPRoomFeature {
  Enabled = '1',
  Disabled = '0',
}

@Entity('rp_rooms')
export class RPRoomEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => RoomEntity, room => room.id)
  @JoinColumn({name: 'id'})
  room?: RoomEntityStruct;

  @Column({name: 'bank_enabled', type: 'enum'})
  bankEnabled!: RPRoomFeature;

  @Column({name: 'casino_enabled', type: 'enum'})
  casinoEnabled!: RPRoomFeature;

  @Column({name: 'melee_enabled', type: 'enum'})
  meleeEnabled!: RPRoomFeature;

  @Column({name: 'shoot_enabled', type: 'enum'})
  shootEnabled!: RPRoomFeature;

  @Column({name: 'bomb_enabled', type: 'enum'})
  bombEnabled!: RPRoomFeature;

  @Column({name: 'hit_enabled', type: 'enum'})
  hitEnabled!: RPRoomFeature;

  @Column({name: 'magic_enabled', type: 'enum'})
  magicEnabled!: RPRoomFeature;

  @Column({name: 'rob_enabled', type: 'enum'})
  robEnabled!: RPRoomFeature;

  @Column({name: 'daylight_enabled', type: 'enum'})
  daylightEnabled!: RPRoomFeature;

  @Column({name: 'turf_enabled', type: 'enum'})
  turfEnabled!: RPRoomFeature;

  @Column({name: 'hospital_enabled', type: 'enum'})
  hospitalEnabled!: RPRoomFeature;

  @Column({name: 'safezone_enabled', type: 'enum'})
  safezoneEnabled!: RPRoomFeature;

  @Column({name: 'mw_enabled', type: 'enum'})
  mwEnabled!: RPRoomFeature;

  @Column({name: 'gym_enabled', type: 'enum'})
  gymEnabled!: RPRoomFeature;

  @Column({name: 'taxi_to_enabled', type: 'enum'})
  taxiToEnabled!: RPRoomFeature;

  @Column({name: 'taxi_from_enabled', type: 'enum'})
  taxiFromEnabled!: RPRoomFeature;

  @Column({name: 'enter_message'})
  enterMessage!: string;

  @Column({name: 'open_time', type: 'int'})
  openTime!: number;

  @Column({name: 'close_time', type: 'int'})
  closeTime!: number;
}
