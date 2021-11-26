import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_weapons')
export class WeaponEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'real_name'})
  name!: string;

  @Column({name: 'fake_name'})
  itemName!: string;

  @Column({name: 'damage_text'})
  damageText!: string;

  @Column({name: 'equip_text'})
  equipText!: string;

  @Column({name: 'unequip_text'})
  unequipText!: string;

  @Column({name: 'reload_text'})
  reloadText!: string;

  @Column({name: 'kill_text'})
  killText!: string;

  @Column({name: 'energy', type: 'int'})
  energyUsed!: number;

  @Column({name: 'effectid', type: 'int'})
  effectID?: number;

  @Column({name: 'handitem', type: 'int'})
  handItem?: number;

  @Column({type: 'int'})
  range!: number;

  @Column({type: 'int'})
  cooldown!: number;

  @Column()
  damage!: string;

  @Column({type: 'int'})
  cost!: number;

  @Column({name: 'weapon_effect'})
  weaponEffect!: string;

  @Column({name: 'w_damage_text'})
  wDamageText!: string;

  @Column({name: 'w_kill_text'})
  wKillText!: string;

  @Column({name: 'reload_time', type: 'int'})
  reloadTime!: number;

  @Column({name: 'clip_size', type: 'int'})
  clipSize!: number;

  @Column({name: 'rank', type: 'int'})
  rank!: number;
}
