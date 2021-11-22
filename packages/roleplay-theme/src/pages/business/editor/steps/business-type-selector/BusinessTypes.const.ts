import {BusinessType} from '@instinct-plugin/roleplay-types';

export const BUSINESS_TYPES: Record<
  BusinessType,
  {
    icon: string;
    label: string;
    desc: string;
    value: BusinessType;
    hidden: boolean;
  }
> = {
  [BusinessType.Store]: {
    icon: 'store',
    label: 'Store',
    desc: 'Sell goods and products to users directly',
    value: BusinessType.Store,
    hidden: false,
  },
  [BusinessType.GunStore]: {
    icon: 'swords',
    label: 'Weapon Store',
    desc: 'Sell weapons to users through the legal process',
    value: BusinessType.GunStore,
    hidden: false,
  },
  [BusinessType.ShootingRange]: {
    icon: 'bullseye',
    label: 'Shooting Range',
    desc: 'Sell bullets to users directly',
    value: BusinessType.ShootingRange,
    hidden: false,
  },
  [BusinessType.GarbageDisposal]: {
    icon: 'trash',
    label: 'Garbage Disposal',
    desc: 'Clean up waste around the city',
    value: BusinessType.GarbageDisposal,
    hidden: false,
  },
  [BusinessType.PrivateDetective]: {
    icon: 'binoculars',
    label: 'Private Detective',
    desc: 'Conduct protection for users with additional perks',
    value: BusinessType.PrivateDetective,
    hidden: false,
  },
  [BusinessType.StateHospital]: {
    icon: 'heart',
    label: 'Hospital',
    desc: '',
    value: BusinessType.StateHospital,
    hidden: true,
  },
  [BusinessType.StatePolice]: {
    icon: 'badge',
    label: 'Police',
    desc: '',
    value: BusinessType.StatePolice,
    hidden: true,
  },
  [BusinessType.StateOfficial]: {
    icon: 'badge',
    label: 'State Official',
    desc: '',
    value: BusinessType.StateOfficial,
    hidden: true,
  },
  [BusinessType.BodyGuard]: {
    icon: 'user-tie',
    label: 'Body Guard',
    desc: 'Protect users with an increased arsenal',
    value: BusinessType.BodyGuard,
    hidden: false,
  },
  [BusinessType.Factory]: {
    icon: 'cog',
    label: 'Factory',
    desc: 'Manufacture products and sell to stores in bulk',
    value: BusinessType.Factory,
    hidden: false,
  },
  [BusinessType.Bank]: {
    icon: 'university',
    label: 'Bank',
    desc: 'Protect users money while investing in stocks',
    value: BusinessType.Bank,
    hidden: false,
  },
};

// @ts-ignore
export const businessTypes = Object.keys(BUSINESS_TYPES).map(
  _ => BUSINESS_TYPES[_]
);
