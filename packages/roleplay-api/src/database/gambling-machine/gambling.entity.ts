import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_casino')
export class GamblingMachineEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column({name: 'minimum', type: 'int'})
  minimumBet!: number;

  @Column({name: 'maximum', type: 'int'})
  maximumBet!: number;

  @Column({type: 'int'})
  multiplier!: number;

  @Column({name: 'item', type: 'int'})
  itemID!: number;
}
