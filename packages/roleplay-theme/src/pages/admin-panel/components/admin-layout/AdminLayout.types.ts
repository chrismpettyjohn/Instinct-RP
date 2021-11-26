import {ReactNode} from 'react';
import {RPPermissions} from '@instinct-plugin/roleplay-types';

export interface AdminLayoutProps {
  children: ReactNode;
  permission?: keyof RPPermissions;
}
