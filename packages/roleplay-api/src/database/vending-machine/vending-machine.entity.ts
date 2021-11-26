import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_vending_machines')
export class VendingMachineEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'real_name'})
  name!: string;

  @Column({name: 'fake_name'})
  itemName!: string;

  @Column({type: 'int'})
  cost!: number;

  @Column({type: 'int'})
  hunger!: number;

  @Column({type: 'int'})
  energy!: number;

  @Column({type: 'int'})
  health!: number;
}
