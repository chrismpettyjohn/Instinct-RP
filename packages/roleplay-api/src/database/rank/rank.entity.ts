import {RPRankEntityStruct} from './rank.types';
import {RPUserEntity} from '../user/user.entity';
import {Column, Entity, OneToMany} from 'typeorm';
import {RPUserEntityStruct} from '../user/user.types';
import {PermissionStatus, RankEntity} from '@instinct-api/database';

@Entity('ranks')
export class RPRankEntity extends RankEntity implements RPRankEntityStruct {
  @OneToMany(() => RPUserEntity, user => user.rank)
  // @ts-ignore
  users?: RPUserEntityStruct[];

  @Column({name: 'website_create_business', type: 'enum', default: '0'})
  websiteCreateBusiness!: PermissionStatus;

  @Column({name: 'website_manage_business', type: 'enum', default: '0'})
  websiteManageBusiness!: PermissionStatus;

  @Column({name: 'website_propose_laws', type: 'enum', default: '0'})
  websiteProposeLaws!: PermissionStatus;

  @Column({name: 'website_vote_on_laws', type: 'enum', default: '0'})
  websiteVoteOnLaws!: PermissionStatus;

  @Column({name: 'website_dismiss_laws', type: 'enum', default: '0'})
  websiteDismissLaws!: PermissionStatus;

  @Column({name: 'website_open_voting_on_laws', type: 'enum', default: '0'})
  websiteOpenVotingOnLaws!: PermissionStatus;

  @Column({name: 'website_stop_voting_on_laws', type: 'enum', default: '0'})
  websiteStopVotingOnLaws!: PermissionStatus;

  @Column({name: 'website_create_guides', type: 'enum', default: '0'})
  websiteCreateGuides!: PermissionStatus;

  @Column({name: 'website_create_guide_categories', type: 'enum', default: '0'})
  websiteCreateGuideCategories!: PermissionStatus;

  @Column({name: 'website_manage_food', type: 'enum', default: '0'})
  websiteManageFood!: PermissionStatus;

  @Column({name: 'website_manage_vending_machines', type: 'enum', default: '0'})
  websiteManageVendingMachines!: PermissionStatus;

  @Column({name: 'website_manage_gambling', type: 'enum', default: '0'})
  websiteManageGambling!: PermissionStatus;

  @Column({name: 'website_manage_weapons', type: 'enum', default: '0'})
  websiteManageWeapons!: PermissionStatus;

  @Column({name: 'website_manage_crimes', type: 'enum', default: '0'})
  websiteManageCrimes!: PermissionStatus;

  @Column({name: 'website_manage_rooms', type: 'enum', default: '0'})
  websiteManageRooms!: PermissionStatus;

  @Column({name: 'website_manage_bounties', type: 'enum', default: '0'})
  websiteManageBounties!: PermissionStatus;

  @Column({name: 'website_manage_properties', type: 'enum', default: '0'})
  websiteManageProperties!: PermissionStatus;

  @Column({
    name: 'website_register_political_party',
    type: 'enum',
    default: '0',
  })
  websiteRegisterPoliticalParty!: PermissionStatus;
}
