import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {FoodType} from '@instinct-plugin/roleplay-types';

export enum FoodServable {
  Yes = '1',
  No = '0',
}

@Entity('rp_food')
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({type: 'enum'})
  type!: FoodType;

  @Column({name: 'item_id', type: 'int'})
  itemID!: number;

  @Column({name: 'extra_data'})
  extraData!: string;

  @Column({type: 'int'})
  cost!: number;

  @Column({name: 'health', type: 'int'})
  healthGained!: number;

  @Column({name: 'energy', type: 'int'})
  energyGained!: number;

  @Column({name: 'hunger', type: 'int'})
  hungerRestored!: number;

  @Column({name: 'serve_text'})
  serveText!: string;

  @Column({name: 'eat_text'})
  eatText!: string;

  @Column({type: 'enum'})
  servable!: FoodServable;
}
